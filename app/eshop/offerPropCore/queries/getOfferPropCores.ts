import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetOfferPropCores
  extends Pick<Prisma.OfferPropCoreFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  // resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetOfferPropCores, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: propsCore,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.offerPropCore.count({ where }),
      query: (paginateArgs) =>
        db.offerPropCore.findMany({
          ...paginateArgs,
          where,
          include: { prop: { include: { values: true } } },
          orderBy,
        }),
    })

    return {
      propsCore,
      nextPage,
      hasMore,
      count,
    }
  }
)
