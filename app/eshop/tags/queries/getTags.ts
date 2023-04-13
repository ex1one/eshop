import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetTags extends Pick<Prisma.TagFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default async function getPropCores({ where, orderBy, skip = 0, take = 100 }: GetTags) {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const {
    items: tags,
    hasMore,
    nextPage,
    count,
  } = await paginate({
    skip,
    take,
    count: () => db.tag.count({ where }),
    query: (paginateArgs) =>
      db.tag.findMany({
        ...paginateArgs,
        where,
        orderBy,
      }),
  })

  return {
    tags,
    nextPage,
    hasMore,
    count,
  }
}
