import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetPropValueCores
  extends Pick<Prisma.PropValueCoreFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  // resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetPropValueCores, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: values,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.propValueCore.count({ where }),
      query: (paginateArgs) =>
        db.propValueCore.findMany({
          ...paginateArgs,
          where,
          orderBy,
        }),
    })

    return {
      values,
      nextPage,
      hasMore,
      count,
    }
  }
)
