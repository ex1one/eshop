import { useAtom } from "jotai"
import { declination } from "app/core/utils"
import { countAtom, searchAtom } from "app/core/atoms"
import { TTreeItem } from "app/core/components"

export const SearchHeader = ({ currentCategory }: { currentCategory?: TTreeItem }) => {
  const [search] = useAtom(searchAtom)
  const [count] = useAtom(countAtom)

  return (
    <div>
      <h1 className="flex items-center gap-2 pt-2 text-3xl font-bold dark:text-gray-400">
        {currentCategory ? `${currentCategory.item.name}: ${search}` : search}
        <span className="text-base font-normal text-gray-400">
          {count} {declination(count, ["Результат", "Результата", "Результатов"])}
        </span>
      </h1>
    </div>
  )
}
