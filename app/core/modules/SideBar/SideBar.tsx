import { useAtom } from "jotai"
import { Category, PropCore, PropValueCore } from "@prisma/client"

import { FilterBlock, FilterPrice } from "app/core/modules"
import { Tree, SearchTree, TTreeItem } from "app/core/components"

import { selectedCategoryAtom } from "app/core/atoms"

import { Icon } from "app/core/UI"

import clsx from "clsx"
import s from "./SideBar.module.css"

interface SideBarProps {
  filters: (PropCore & { values: PropValueCore[] })[]
  onToggleOpenFilters: () => void
  searchTree: { category: Category; successors: Category[] }[]
  currentCategory?: TTreeItem
}

export const SideBar = ({
  filters,
  onToggleOpenFilters,
  searchTree,
  currentCategory,
}: SideBarProps) => {
  const [selectedCategory] = useAtom(selectedCategoryAtom)

  return (
    <>
      <div className={clsx("hidden md:block", s.sidebar)}>
        <FilterPrice />
        {selectedCategory ? (
          <Tree currentCategory={currentCategory} />
        ) : (
          <SearchTree searchTree={searchTree} />
        )}
        {filters.map((prop) => (
          <FilterBlock key={prop.name} name={prop.name} values={prop.values} />
        ))}
      </div>

      <div className="flex items-center justify-end py-2 md:hidden">
        <div className="flex items-center justify-center rounded-2xl bg-black/10 p-2 transition duration-200 hover:bg-black/20">
          <Icon onClick={onToggleOpenFilters} name="arrow-left-right" className="h-6 w-6" />
        </div>
      </div>
    </>
  )
}
