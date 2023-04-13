import { Link } from "blitz"
import { useAtom } from "jotai"

import { searchAtom, selectedCategoryAtom, treeAtom } from "app/core/atoms"
import { TTreeItem, Crumb } from "app/core/components"

import clsx from "clsx"
import s from "./BreadCrumbs.module.css"

interface BreadCrumbsProps {
  currentCategory?: TTreeItem
}

export const BreadCrumbs = ({ currentCategory }: BreadCrumbsProps) => {
  const [, setSelectedCategory] = useAtom(selectedCategoryAtom)
  const [, setSearch] = useAtom(searchAtom)

  return (
    <div className={clsx("flex overflow-x-auto overflow-y-hidden", s.crumbs)}>
      <div className="whitespace-nowrap text-sm text-gray-400">
        <Link passHref href="/">
          <a
            onClick={() => {
              setSelectedCategory(undefined)
              setSearch(undefined)
            }}
            className={clsx(
              "inline-block cursor-pointer hover:text-black/60 hover:text-black dark:bg-gradient-to-b dark:from-gray-400 dark:to-gray-400 dark:hover:text-gray-300",
              s.linkUnderline
            )}
          >
            Все категории
          </a>
        </Link>
        <span className="mx-1 text-sm text-neutral-400">{"/"}</span>
      </div>
      {currentCategory && <Crumb crumb={currentCategory} />}
    </div>
  )
}

export default BreadCrumbs
