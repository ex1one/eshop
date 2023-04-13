import { useAtom } from "jotai"
import { Link, useRouter } from "blitz"
import { Category } from "@prisma/client"

import { selectedCategoryAtom } from "app/core/atoms"

import { Icon } from "app/core/UI"

interface SearchTreeItemProps {
  item: { category: Category; successors: Category[] }
}

export const SearchTreeItem = ({ item }: SearchTreeItemProps) => {
  const { query, pathname } = useRouter()
  const { id, ...other } = query

  const [, setSelectedCategory] = useAtom(selectedCategoryAtom)

  return (
    <>
      <li onClick={() => setSelectedCategory(item.category.id)}>
        <Link shallow href={{ pathname, query: { id: item.category.id, ...other } }}>
          <a className="flex cursor-pointer items-center gap-2 text-base transition duration-200 hover:text-black/60">
            <Icon name="square" className="h-4 w-4" />
            {item.category.name}
          </a>
        </Link>
      </li>
      {item.successors?.map((successor) => (
        <li onClick={() => setSelectedCategory(successor.id)} key={successor.id} className="ml-6">
          <Link shallow href={{ pathname, query: { id: successor.id, ...other } }}>
            <a className="flex cursor-pointer items-center gap-2 text-base transition duration-200 hover:text-black/60">
              <Icon name="square" className="h-4 w-4" />
              {successor.name}
            </a>
          </Link>
        </li>
      ))}
    </>
  )
}
