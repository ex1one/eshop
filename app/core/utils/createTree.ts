import { Category } from "@prisma/client"
import { createTreeNodeFromCat, updateParents, updateParentsForChilds } from "app/core/utils"

interface CreateTreeProps {
  categories: (Category & { childs: Category[]; successors: Category[] })[]
}

export const createTree = ({ categories }: CreateTreeProps) => {
  let tree = categories
    .map((category) => createTreeNodeFromCat({ category, categories }))
    .map((treeItem, i, tree) => updateParents(tree, treeItem))

  updateParentsForChilds(tree)

  return tree
}
