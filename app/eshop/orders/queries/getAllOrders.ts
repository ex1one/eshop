import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetOrdersInput
  extends Pick<Prisma.OrderFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  // resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetOrdersInput, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: orders,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.order.count({ where }),
      query: (paginateArgs) =>
        db.order.findMany({
          ...paginateArgs,
          where: {
            userId: ctx.session.userId,
          },
          orderBy,
          include: {
            items: { include: { offer: { include: { image: true } } } },
          },
        }),
    })

    return {
      orders,
      nextPage,
      hasMore,
      count,
    }
  }
)
