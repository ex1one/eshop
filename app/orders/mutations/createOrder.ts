import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { getRandomLink } from "app/eshop/orders/getRandomLink"
import _ from "lodash"

const Item = z.object({
  offerId: z.number(),
  quantity: z.number(),
})

const CreateOrder = z.object({
  items: z.array(Item),
})

export default resolver.pipe(resolver.zod(CreateOrder), async ({ items }, ctx) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const link = await getRandomLink()
  const offerItems = await db.offer.findMany({
    where: {
      id: { in: items.map((item) => item.offerId) },
    },
    include: {
      product: true,
    },
  })

  const orderItems = offerItems.map((offerItem) => {
    const cartItem = items.find((item) => item.offerId === offerItem.id)!

    return {
      quantity: cartItem.quantity,
      sum: cartItem.quantity * +offerItem.price,
      offerId: cartItem.offerId,
      orderItem: offerItem,
    }
  })

  return await db.order.create({
    data: {
      userId: ctx.session.userId,
      items: {
        createMany: {
          data: orderItems.map((order) => ({
            offerId: order.offerId,
            price: order.orderItem.price,
            productId: order.orderItem.productId,
            quantity: order.quantity,
            sum: order.sum,
          })),
        },
      },
      link,
      sum: _.sumBy(orderItems, (order) => order.sum),
    },
    include: {
      items: {
        include: {
          offer: true,
        },
      },
    },
  })
})
