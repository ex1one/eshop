import { NotFoundError } from "blitz"
import db, { wd_Offer, Prisma, wd_OfferPrice } from "db"
import { WEED_OFFERS } from "../mock"

export default async function getWeedOffers({}) {
  let offers: (wd_Offer & {
    prices: wd_OfferPrice[]
  })[] = []
  if ((await db.wd_Offer.count({})) > 30) {
    await db.wd_OfferPrice.deleteMany({})
    await db.wd_Offer.deleteMany({})
  }
  do {
    offers = await db.wd_Offer.findMany({
      include: { prices: true },
      orderBy: {
        updatedAt: "desc",
      },
    })
    if (!offers.length) await db.wd_Offer.createMany({ data: getCreateData() })
  } while (offers.length == 0)

  return offers.map((o) => ({
    ...o,
    pricess2: JSON.stringify(
      o.prices.map((row) => ({
        p: row.price,
        w: row.weight,
      }))
    ),
  }))
}

function getCreateData() {
  let d: Prisma.wd_OfferCreateManyInput[] = WEED_OFFERS.map((o) => ({
    name: o.name,
    cbd: o.cbd,
    thc: o.thc,
    grade: o.grade,
    indicness: o.indicness,
    sativeness: o.sativeness,
  }))

  return d
}
