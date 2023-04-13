import { paginate } from "blitz"
import db, { Prisma } from "db"
import { Filter } from "app/core/atoms"
import { TTreeItem } from "app/core/components"

interface GetProductsInput extends Pick<Prisma.ProductFindManyArgs, "orderBy" | "skip" | "take"> {
  search: string | undefined
  selectedCategories: TTreeItem[]
  filters: Filter[]
  maxPrice: number | undefined
  minPrice: number | undefined
}

export default async function getProductsForAdmin({
  orderBy,
  skip = 0,
  take = 100,
  search,
  selectedCategories,
  filters,
  maxPrice,
  minPrice,
}: GetProductsInput) {
  const where: Prisma.ProductWhereInput = {
    name: {
      contains: search,
      mode: "insensitive",
    },
    categories: {
      some: {
        predecessors: { some: { id: { in: selectedCategories.map((item) => item.item.id) } } },
      },
    },
    offers: {
      some: {
        price: { lte: maxPrice, gte: minPrice },
        AND: filters.map((filter) => ({
          propsCore: {
            some: {
              prop: { name: filter.name },
              value: { id: { in: filter.values } },
            },
          },
        })),
      },
    },
  }

  const {
    items: products,
    hasMore,
    nextPage,
    count,
  } = await paginate({
    skip,
    take,
    count: () => db.product.count({ where }),
    query: (paginateArgs) =>
      db.product.findMany({
        ...paginateArgs,
        where,
        orderBy,
        include: {
          categories: { include: { successors: true } },
          offers: {
            include: {
              propsCore: { include: { prop: { include: { values: true } }, value: true } },
            },
          },
          images: true,
        },
      }),
  })

  return {
    products,
    nextPage,
    hasMore,
    count,
  }
}
