import { Category } from "@prisma/client"
import { TTreeItem } from "../components"

interface createTreeNodeFromCatProps {
  category: Category & { successors: Category[] }
  categories: (Category & { childs: Category[]; successors: Category[] })[]
}

export function createSuccessors({ category, categories }: createTreeNodeFromCatProps) {
  return (
    category?.successors.filter((s) =>
      categories.find((c) => c.id === s.id && c.id !== category.id)
    ) ?? []
  )
}

export function createTreeNodeFromCat({
  category,
  categories,
}: createTreeNodeFromCatProps): TTreeItem {
  let childs = categories.filter((c) => c.parentId == category.id)

  const items = childs.map((child) =>
    createTreeNodeFromCat({
      category: child,
      categories: categories,
    })
  )

  return { item: category, childs: items }
}

export function updateParentsForChilds(tree: TTreeItem[], parent?: TTreeItem) {
  for (const node of tree) {
    node.parent = parent ? parent : node.parent
    updateParentsForChilds(node.childs, node)
  }
}

export function updateParents(tree: TTreeItem[], treeItem: TTreeItem): TTreeItem {
  const parent = tree.find((item) => item.item.id === treeItem?.item.parentId)
  const newParent = parent && updateParents(tree, parent)

  return { ...treeItem, parent: newParent }
}
