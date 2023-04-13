import db from "db"
import { CategoryDto } from "app/interfaces/I1CExport"
import _ from "lodash"

export async function uploadCategories(categories: CategoryDto[]) {
  if (!categories) {
    return console.log("No categories section found")
  }

  // 0. Loading existing categories
  const existingCategories = await db.category.findMany({
    where: { externalId: { in: categories.map((category) => category.id) } },
  })

  {
    // 1. creating new categories
    console.log("2. creating new categories")
    let newCategories = categories.filter(
      (category) => !existingCategories.find((c) => c.externalId == category.id)
    )
    await db.category.createMany({
      data: newCategories.map((c) => ({
        name: c.name,
        externalId: c.id,
      })),
    })
  }

  // 2. updating all
  let dbCategories = await db.category.findMany({
    where: {
      externalId: {
        in: categories.map((s) => s.id),
      },
    },
  })

  let allCategories = await db.$transaction(
    dbCategories
      .map((dbItem) => {
        let inpData = categories.find((c) => c.id == dbItem.externalId)
        if (!inpData) return undefined
        return db.category.update({
          data: {
            name: inpData.name,
            externalId: inpData.id,
          },
          where: {
            id: dbItem.id,
          },
        })
      })
      .filter((c) => c)
      .map((c) => c!)
  )

  // 3. Updating the parentId for children
  await db.$transaction(
    allCategories
      .map((category) => {
        const childs = categories.filter((c) => c.parentId == category.externalId)

        if (!childs) return undefined

        return db.category.updateMany({
          data: { parentId: category.id },
          where: { externalId: { in: childs.map((child) => child.id) } },
        })
      })
      .filter((c) => c)
      .map((c) => c!)
  )

  // 4. Getting the category and parent id
  let cat2parent = _(allCategories)
    .filter((c) => !!c.parentId)
    .keyBy((c) => c.id)
    .mapValues((c) => c.parentId)
    .value()

  // 5. Creating Ancestors
  for (const category of allCategories) {
    const predecessors = getAncestors(category.id, cat2parent) // Getting Ancestors

    await db.category.update({
      data: {
        predecessors: {
          disconnect: predecessors.map((id) => ({ id })),
          connect: predecessors.map((id) => ({ id })),
        },
      },
      where: { id: category.id },
    })
  }
}

function getAncestors(catId: number, cat2parent: { [catId: string]: number | null }) {
  const ancs = [catId]

  while (cat2parent[catId]) {
    let parentId = cat2parent[catId]
    ancs.push(parentId as number)
    catId = parentId as number
  }

  return ancs
}
