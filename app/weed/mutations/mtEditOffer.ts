import { resolver } from "blitz"
import db, { wd_Offer, wd_OfferPrice } from "db"
import { z } from "zod"

// { editable: true, path: "name"}, //, type: "datetime" },
// { editable: true, path: "sativeness" },
// { editable: true, path: "indicness" },
// { editable: true, path: "thc" },
// { editable: true, path: "cbd" },
// { editable: true, path: "grade" },
// { editable: true, path: "flavours" },
// { edi```ta```ble: true, path: "effects" },

const SEditWeedOffer = z.object({
  id: z.number().optional(),
  data: z
    .object({
      // move all fields to updateFields var
      date: z.date().optional(),
      sativeness: z.number().optional(),
      indicness: z.number().optional(),
      thc: z.number().optional(),
      cbd: z.number().optional(),
      grade: z.enum(["TOP", "EXOTIC", "MID"]).optional(),
      apikeyId: z.string().optional(),
      flavours: z.string().optional(),
      effects: z.string().optional(),
      name: z.string().optional(),
      img: z.string().optional(),
      prices: z.optional(z.string()),
    })
    .optional(),
  isNew: z.boolean().optional(),
  isDel: z.boolean().optional(),
})

export default resolver.pipe(
  resolver.zod(SEditWeedOffer),
  // resolver.authorize(),
  async (payload: z.infer<typeof SEditWeedOffer>, ctx) => {
    if (payload.isDel) {
      if (!payload.id) throw new Error("wtfasdas")
    }
    let { prices: porig = "", ...dt } = payload.data || {}

    let prices = JSON.parse(porig || "[]")

    let offer: wd_Offer & {
      prices: wd_OfferPrice[]
      prices2: string
    } = {} as any

    if ((payload.isNew || !payload.id) && payload.data) {
      let offer = await db.wd_Offer.create({
        data: {
          ...dt,
          name: payload.data.name || "",
          prices: {
            create: prices.map((p2) => ({
              price: p2.p,
              weight: p2.w,
            })),
          },
        },
        include: { prices: true },
      })
      // function updateprices/(offer2: typeof offer) {}
    } else {
      let offer = await db.wd_Offer.update({
        where: {
          id: payload.id,
        },
        data: {
          ...dt,
          prices: {
            disconnect: {},
            create: prices.map((p2) => ({
              price: p2.p,
              weight: p2.w,
              include: { prices: true },
            })),
          },
        },
      })
    }
    offer.prices2 = (offer.prices || []).join(", ")
    return offer
  }
)
