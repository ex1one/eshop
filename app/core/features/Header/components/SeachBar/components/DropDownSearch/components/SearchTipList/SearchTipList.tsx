import { Link } from "blitz"
import { useAtom } from "jotai"
import { Tag } from "@prisma/client"
import { Icon } from "app/core/UI"
import { searchAtom } from "app/core/atoms"

interface SearchTipListProps {
  onCloseDropDownSearch?: () => void
  tags: Tag[]
  onCloseSearchModal?: () => void
}

export const SearchTipList = ({
  tags,
  onCloseDropDownSearch,
  onCloseSearchModal,
}: SearchTipListProps) => {
  const [, setSearch] = useAtom(searchAtom)

  return (
    <ul>
      {tags.map((item) => (
        <li
          onClick={() => {
            setSearch(item.keyword)
            onCloseSearchModal?.()
            onCloseDropDownSearch?.()
          }}
          key={item.id}
        >
          <Link passHref href={`/search?searchText=${item.keyword}`}>
            <a className="flex w-full cursor-pointer items-center justify-between border-b border-gray-400 p-2 transition duration-200 md:rounded-2xl md:border-0 md:hover:bg-black/20 md:hover:text-black/60 ">
              {item.keyword}
              <Icon name="search" className="block h-4 w-4 flex-[0_0_20px] md:hidden" />
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
