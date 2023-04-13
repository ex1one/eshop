import { resolver } from "blitz"
import db from "db"
import _ from "lodash"
import { z } from "zod"

const Inputs = z.object({
  // botId: z.number(),
  items: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      q: z.number(),
    })
  ),
})
// {`bots[${b.cond_botId}].${b.cond_field} ${b.cond_statement} ${b.cond_value}`}

export default resolver.pipe(resolver.zod(Inputs), async (input, ctx) => {
  let items = input.items.filter((e) => e.q > 0)

  if (!items.length) throw new Error("!items.length")

  let order = await db.wd_Order.create({
    data: {
      totalG: _.sumBy(items, (e) => e.q),
      link: await generateUniqLink(),
    },
  })
  return order
})

async function generateUniqLink() {
  let link = ""
  do {
    link = makeid(6)
  } while (await db.wd_Order.findFirst({ where: { link } }))
  return link
}

function makeid(length) {
  let result = ""
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const charactersLength = characters.length
  let counter = 0
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return result
}
