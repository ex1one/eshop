import { NotFoundError } from "blitz"
import db from "db"

export default async function getOrder({ link }: { link: string }) {
  const order = await db.wd_Order.findFirst({
    where: { link },
    // include: {
    //   items: {
    //     include: {
    //       product: {
    //         include: {
    //           offers: { include: { image: true } },
    //         },
    //       },
    //       offer: { include: { image: true, product: true } },
    //     },
    //   },
    // },
  })

  if (!order) throw new NotFoundError()

  return order
}
