import { Link } from "blitz"
import { useAtom } from "jotai"

import { selectedCategoryAtom } from "app/core/atoms"
import { TTreeItem } from "app/core/components"

import s from "../BreadCrumbs.module.css"
import clsx from "clsx"

export const Crumb = ({ crumb }: { crumb: TTreeItem }) => {
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom)

  return (
    <>
      {crumb.parent && <Crumb crumb={crumb.parent} />}
      <div className="inline-block whitespace-nowrap text-sm text-gray-400" key={crumb.item.id}>
        <Link passHref shallow href={`/category/${crumb.item.id}`}>
          <a
            onClick={() => setSelectedCategory(crumb.item.id)}
            className={clsx(
              "inline-block cursor-pointer hover:text-black/60 hover:text-black dark:bg-gradient-to-b dark:from-gray-400 dark:to-gray-400 dark:hover:text-gray-300",
              s.linkUnderline
            )}
          >
            {crumb.item.name}
          </a>
        </Link>
        {selectedCategory !== crumb.item.id && (
          <span className="mx-1 text-sm text-neutral-400">{"/"}</span>
        )}
      </div>
    </>
  )
}
