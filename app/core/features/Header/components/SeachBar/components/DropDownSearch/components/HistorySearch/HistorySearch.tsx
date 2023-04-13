import { useAtom } from "jotai"
import { Link } from "blitz"
import { searchAtom, searchHistoryAtom } from "app/core/atoms"
import { Icon } from "app/core/UI"

interface HistorySearchProps {
  onCloseDropDownSearch?: () => void
  onCloseSearchModal?: () => void
  isMobileView?: boolean
}

export const HistorySearch = ({
  onCloseDropDownSearch,
  onCloseSearchModal,
  isMobileView,
}: HistorySearchProps) => {
  const [, setSearch] = useAtom(searchAtom)
  const [historySearch, setHistorySearch] = useAtom(searchHistoryAtom)

  const deleteHistorySearchItem = (keyword: string) => {
    setHistorySearch((prev) => prev.filter((item) => item.keyword !== keyword))
  }

  return (
    <>
      {historySearch.length ? (
        <>
          <h3 className="mb-2 ml-0 ml-2 flex items-center justify-between text-lg font-bold md:ml-2">
            История поиска
            <span
              onClick={(e) => {
                setHistorySearch([])
                e.stopPropagation()
              }}
              className="block border-b border-black text-sm hover:text-black/60 md:hidden"
            >
              Очистить
            </span>
          </h3>
          <ul className="mb-4 flex flex-wrap items-center gap-2 md:block">
            {(isMobileView ? historySearch : historySearch.slice(0, 5)).reverse().map((item) => (
              <li
                onClick={() => {
                  setSearch(item.keyword)
                  onCloseSearchModal?.()
                  onCloseDropDownSearch?.()
                }}
                className="flex w-full max-w-fit cursor-pointer items-center justify-between rounded-2xl bg-black/20 transition duration-200 md:mb-0 md:max-w-full md:bg-transparent md:hover:bg-black/20"
                key={item.keyword}
              >
                <Link passHref href={`/search?searchText=${item.keyword}`}>
                  <a className="block w-full p-2 text-base font-bold md:font-normal">
                    {item.keyword}
                  </a>
                </Link>
                <Icon
                  onClick={(e) => {
                    deleteHistorySearchItem(item.keyword)
                    e.stopPropagation()
                  }}
                  name="close"
                  className="hidden h-6 w-6 md:block"
                />
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </>
  )
}
