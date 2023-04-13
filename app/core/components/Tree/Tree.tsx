import { Link } from "blitz"
import { useAtom } from "jotai"

import { selectedCategoryAtom } from "app/core/atoms"
import { PredecessorItem, TreeItem, TTreeItem } from "app/core/components"

import { Icon } from "app/core/UI"

interface TreeProps {
  currentCategory?: TTreeItem
}

export const Tree = ({ currentCategory }: TreeProps) => {
  const [, setSelectedCategory] = useAtom(selectedCategoryAtom)

  return (
    <ul className="pb-4 text-lg">
      <li onClick={() => setSelectedCategory(undefined)} className="mb-1 w-full">
        <Link shallow passHref href="/">
          <a className="flex cursor-pointer items-center gap-2 text-sm font-bold transition duration-200 hover:text-black/60">
            <Icon name="arrow-left" className="h-4 w-4" />
            <span>Любая категория</span>
          </a>
        </Link>
      </li>
      <PredecessorItem item={currentCategory} />
      {currentCategory?.childs.map((child) => (
        <TreeItem key={child.item.id} treeNode={child} />
      ))}
    </ul>
  )
}
