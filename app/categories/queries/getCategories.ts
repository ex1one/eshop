import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetCategoriesInput
  extends Pick<Prisma.CategoryFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default async function getCategories({
  where,
  orderBy,
  skip = 0,
  take = 100,
}: GetCategoriesInput) {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const {
    items: categories,
    hasMore,
    nextPage,
    count,
  } = await paginate({
    skip,
    take,
    count: () => db.category.count({ where }),
    query: (paginateArgs) =>
      db.category.findMany({
        ...paginateArgs,
        where,
        orderBy,
        include: {
          products: true,
          childs: true,
          successors: {
            include: {
              childs: true,
              successors: { include: { products: true } },
              predecessors: true,
              products: true,
            },
          },
          predecessors: { include: { childs: true, successors: true, predecessors: true } },
        },
      }),
  })
  return {
    categories,
    nextPage,
    hasMore,
    count,
  }
}
