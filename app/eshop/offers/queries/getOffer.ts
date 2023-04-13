import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetOffer = z.object({
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetOffer), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const offer = await db.offer.findFirst({
    where: { id },
    include: {
      propsCore: {
        include: {
          prop: { include: { values: { where: { offersProps: { some: { offerId: id } } } } } },
        },
      },
      product: { include: { images: true, offers: true } },
    },
  })

  if (!offer) throw new NotFoundError()

  return offer
})
