import { Link } from "blitz"
import { useAtom } from "jotai"

import { TTreeItem } from "app/core/components"

import { countAtom, selectedCategoryAtom, treeAtom } from "app/core/atoms"
import { declination } from "app/core/utils/declination"

import clsx from "clsx"
import s from "./Chips.module.css"

interface ChipsProps {
  currentCategory?: TTreeItem
}

export const Chips = ({ currentCategory }: ChipsProps) => {
  const [count] = useAtom(countAtom)
  const [, setSelectedCategory] = useAtom(selectedCategoryAtom)

  return (
    <div className="mt-3">
      <h1 className="flex flex-col gap-0 text-3xl font-bold dark:text-gray-400 md:flex-row md:items-center md:gap-2">
        {currentCategory?.item.name}
        <span className="text-base font-normal text-gray-400">
          {count} {declination(count, ["Результат", "Результата", "Результатов"])}
        </span>
      </h1>
      <div
        className={clsx("mt-6 flex items-center gap-2 overflow-x-auto overflow-y-hidden", s.childs)}
      >
        {currentCategory?.childs.map((child) => (
          <Link passHref shallow href={`/category/${child.item.id}`} key={child.item.id}>
            <a
              onClick={() => setSelectedCategory(child.item.id)}
              className="cursor-pointer whitespace-nowrap rounded bg-black/10 p-2 font-bold tracking-tight transition duration-200 hover:bg-black/20 hover:text-black/60"
            >
              {child.item.name}
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}
