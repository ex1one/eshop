import { Link } from "blitz"
import { useAtom } from "jotai"

import { selectedCategoryAtom } from "app/core/atoms"
import { TTreeItem } from "app/core/components"
import { Icon } from "app/core/UI"

interface PredecessorItemProps {
  item?: TTreeItem
}

export const PredecessorItem = ({ item }: PredecessorItemProps) => {
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom)

  return (
    <>
      {item?.parent && <PredecessorItem item={item.parent} />}
      {item && (
        <li className="mb-1 w-full" onClick={() => setSelectedCategory(item?.item.id)}>
          <Link passHref shallow href={`/category/${item.item.id}`}>
            <a className="flex cursor-pointer items-center gap-2 text-sm font-bold transition duration-200  hover:text-black/60">
              {item.item.id === selectedCategory ? (
                <Icon className="h-4 w-4" name="check-square-fill" />
              ) : (
                <Icon name="arrow-left" className="h-4 w-4" />
              )}
              {item.item.name}
            </a>
          </Link>
        </li>
      )}
    </>
  )
}
