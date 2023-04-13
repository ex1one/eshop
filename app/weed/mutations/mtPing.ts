import Pingeon from "app/core/Pingeon"
import { resolver } from "blitz"
import db from "db"
import _ from "lodash"
import { z } from "zod"

const Inputs = z.object({
  msg: z.string(),
})
// {`bots[${b.cond_botId}].${b.cond_field} ${b.cond_statement} ${b.cond_value}`}

export default resolver.pipe(resolver.zod(Inputs), async (input, ctx) => {
  Pingeon.me(input.msg)
  return true
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
