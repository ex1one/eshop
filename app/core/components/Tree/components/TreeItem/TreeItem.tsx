import { useAtom } from "jotai"
import { Link, useRouter } from "blitz"
import { Category } from "@prisma/client"

import { selectedCategoryAtom } from "app/core/atoms"
import { Icon } from "app/core/UI"

export interface TTreeItem {
  item: Category
  childs: TTreeItem[]
  parent?: TTreeItem
}

interface TreeItemProps {
  treeNode: TTreeItem
}

export const TreeItem = ({ treeNode }: TreeItemProps) => {
  const { query, pathname } = useRouter()
  const [, setSelectedCategory] = useAtom(selectedCategoryAtom)

  return (
    <li onClick={() => setSelectedCategory(treeNode.item.id)} className="ml-6 w-full">
      <Link shallow passHref href={{ pathname, query: { ...query, id: treeNode.item.id } }}>
        <a className="flex cursor-pointer items-center gap-2 text-base transition duration-200 hover:text-black/60">
          <Icon name="square" className="h-4 w-4 flex-[0_0_auto]" />
          <span className="break-keep flex-1">{treeNode.item.name}</span>
        </a>
      </Link>
    </li>
  )
}
