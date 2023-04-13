import { useAtom } from "jotai"
import { Category, PropCore, PropValueCore } from "@prisma/client"

import { Tree, SearchTree, Popup, TTreeItem } from "app/core/components"
import { FilterBlock, FilterPrice } from "app/core/modules"

import { selectedCategoryAtom } from "app/core/atoms"

import s from "./ModalFilters.module.css"
import clsx from "clsx"

interface ModalFiltersProps {
  filters: (PropCore & { values: PropValueCore[] })[]
  searchTree: { category: Category; successors: Category[] }[]
  isOpen: boolean
  onClose: () => void
  currentCategory?: TTreeItem
}

export const ModalFilters = ({
  filters,
  onClose,
  isOpen,
  searchTree,
  currentCategory,
}: ModalFiltersProps) => {
  const [selectedCategory] = useAtom(selectedCategoryAtom)

  return (
    <Popup
      overlayProps={{ className: "bg-black/80 p-2" }}
      title={<div className="mb-2 text-3xl font-bold">Фильтры</div>}
      className={clsx(
        "mx-2 h-[80%] w-full overflow-hidden overflow-y-scroll rounded-3xl bg-white px-2 py-2",
        s.modal
      )}
      onClose={onClose}
      isOpen={isOpen}
    >
      <FilterPrice />
      {selectedCategory ? (
        <Tree currentCategory={currentCategory} />
      ) : (
        <SearchTree searchTree={searchTree} />
      )}
      {filters.map((filter) => (
        <FilterBlock key={filter.id} name={filter.name} values={filter.values} />
      ))}
    </Popup>
  )
}
