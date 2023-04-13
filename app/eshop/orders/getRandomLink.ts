import db from "db"
import { Order } from "@prisma/client"

function getRandomString(length = 6) {
  const string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let randomString = ""

  while (randomString.length < length) {
    randomString += string[Math.floor(Math.random() * string.length)]
  }

  return randomString
}

export async function getRandomLink(length = 6) {
  let link: string
  let order: Order | null

  do {
    link = getRandomString(length)
    order = await db.order.findFirst({
      where: {
        link,
      },
    })
  } while (order)

  return link
}
