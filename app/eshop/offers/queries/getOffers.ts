import { paginate } from "blitz"
import db, { Prisma } from "db"
import { TTreeItem } from "app/core/components"
import { Filter } from "app/core/atoms"

interface GetOffersInput extends Pick<Prisma.OfferFindManyArgs, "orderBy" | "skip" | "take"> {
  search?: string
  selectedCategory?: number
  filters?: Filter[]
  offersId?: number[]
}

export default async function getOffers({
  orderBy,
  skip = 0,
  take = 100,
  search,
  offersId,
  selectedCategory,
  filters,
}: GetOffersInput) {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const where: Prisma.OfferWhereInput = {
    name: {
      contains: search || undefined,
      mode: "insensitive",
    },
    product: {
      categories: {
        some: { predecessors: { some: { id: selectedCategory } } },
      },
    },
    AND: filters?.map((filter) => ({
      propsCore: {
        some: {
          prop: { name: filter.name },
          value: { id: { in: filter.values } },
        },
      },
    })),
    id: { in: offersId },
  }

  const {
    items: offers,
    hasMore,
    nextPage,
    count,
  } = await paginate({
    skip,
    take,
    count: () => db.offer.count({ where }),
    query: (paginateArgs) =>
      db.offer.findMany({
        ...paginateArgs,
        where,
        orderBy,
        include: {
          image: true,
          product: { include: { categories: { include: { successors: true } }, images: true } },
          propsCore: {
            include: { prop: { include: { values: true } }, value: true },
          },
        },
      }),
  })

  return {
    offers,
    nextPage,
    hasMore,
    count,
  }
}
