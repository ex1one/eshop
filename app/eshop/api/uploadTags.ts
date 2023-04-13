import { ItemDto } from "../../interfaces/I1CExport"
import db from "db"
import _ from "lodash"

export async function uploadTags(items: ItemDto[]) {
  if (!items) {
    return console.log("No items section found")
  }

  const tags = items.flatMap((item) => item.tags)
  console.log(tags, "tags")

  // 0. Loading existing categories
  const existingTags = await db.tag.findMany({ where: { keyword: { in: tags } } })

  {
    // 1. creating new categories
    console.log("2. creating new tags")
    let newTags = _(tags)
      .filter((tag) => !existingTags.find((t) => tag == t.keyword))
      .uniq()
      .map((t) => ({ keyword: t }))
      .value()

    await db.tag.createMany({ data: newTags })
  }

  // 2. updating all
  let dbTags = await db.tag.findMany({
    where: { keyword: { in: tags } },
  })

  let dbProducts = await db.product.findMany({
    where: { externalId: { in: items.map((i) => i.externalId) } },
  })

  let allTags = await db.$transaction(
    dbTags.map((dbItem) => {
      let inpData = dbProducts.filter((i) =>
        items.some((item) => item.tags.includes(dbItem.keyword))
      )

      return db.tag.update({
        data: { products: { connect: inpData.map((i) => ({ id: i.id })) } },
        where: { id: dbItem.id },
      })
    })
  )
}
