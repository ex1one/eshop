import { Link } from "blitz"
import { useAtom } from "jotai"
import { Tag } from "@prisma/client"
import { searchAtom } from "app/core/atoms"

interface MoreInterestingProps {
  onCloseDropDownSearch?: () => void
  hasMoreTags: boolean
  showMoreTags: () => void
  tags: Tag[]
  onCloseSearchModal?: () => void
}

export const MoreInteresting = ({
  onCloseDropDownSearch,
  tags,
  hasMoreTags,
  showMoreTags,
  onCloseSearchModal,
}: MoreInterestingProps) => {
  const [, setSearch] = useAtom(searchAtom)

  return (
    <>
      <div className="ml-0 flex h-10 items-center justify-between md:ml-2">
        <h3 className="text-lg font-bold">Популярное</h3>
        <span
          onClick={() => hasMoreTags && showMoreTags()}
          className="cursor-pointer border-b border-black text-sm font-bold hover:text-black/60"
        >
          Ещё больше
        </span>
      </div>
      <ul className="flex flex-wrap items-center gap-2 md:block">
        {tags.slice(0, 5).map((item) => (
          <li
            className="max-w-fit md:mb-0 md:max-w-full"
            onClick={() => {
              setSearch(item.keyword)
              onCloseSearchModal?.()
              onCloseDropDownSearch?.()
            }}
            key={item.id}
          >
            <Link passHref href={`/search?searchText=${item.keyword}`}>
              <a className="flex w-full cursor-pointer items-center justify-between rounded-2xl bg-black/20 p-2 font-bold transition duration-200 md:bg-transparent md:font-normal  md:hover:bg-black/20">
                {item.keyword}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
