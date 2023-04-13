import { Prisma } from "@prisma/client"
import getCategories from "app/categories/queries/getCategories"
import { createSuccessors } from "app/core/utils"

import _ from "lodash"

const getSearchCategories = async (search: string | undefined) => {
  const where: Prisma.CategoryWhereInput = {
    products: {
      some: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    },
  }

  const { categories } = await getCategories({ where })

  return categories
}

export const createSearchTree = async (search: string | undefined) => {
  const categories = await getSearchCategories(search)

  return _(categories)
    .map((c, i, array) => {
      if (!c.parentId) {
        const successors = createSuccessors({ categories: _(array).value(), category: c })

        return { category: c, successors }
      } else {
        const parentSuccessor = c.predecessors.find((item) => !item.parentId)!
        const successors = createSuccessors({
          categories: _(array).value(),
          category: parentSuccessor,
        })

        return { category: parentSuccessor, successors }
      }
    })
    .uniqBy((c) => c.category?.id)
    .value()
}
