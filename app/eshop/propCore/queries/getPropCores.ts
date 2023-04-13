import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetPropCores
  extends Pick<Prisma.PropCoreFindManyArgs, "where" | "orderBy" | "skip" | "take"> {
  offersWhere?: Prisma.OfferWhereInput
}

export default async function getPropCores({
  where,
  orderBy,
  skip = 0,
  offersWhere,
  take = 100,
}: GetPropCores) {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const {
    items: props,
    hasMore,
    nextPage,
    count,
  } = await paginate({
    skip,
    take,
    count: () => db.propCore.count({ where }),
    query: (paginateArgs) =>
      db.propCore.findMany({
        ...paginateArgs,
        where,
        orderBy,
        include: {
          values: {
            where: { offersProps: { some: { offer: offersWhere } } },
            include: { offersProps: { include: { offer: true } } },
          },
        },
      }),
  })

  return {
    props,
    nextPage,
    hasMore,
    count,
  }
}
