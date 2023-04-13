import { useEffect, useState } from "react"
import { usePaginatedQuery, useQuery, useRouter } from "blitz"
import { HistorySearch, MoreInteresting, SearchTipList } from "../index"

import getTags from "app/eshop/tags/queries/getTags"

import { NO_REFETCH } from "app/core/mocks"

interface DropDownSearchContentProps {
  inputSearch: string
  onClose?: () => void
  onCloseSearchModal?: () => void
  isMobileView?: boolean
}

export const DropDownSearchContent = ({
  inputSearch,
  onClose,
  onCloseSearchModal,
  isMobileView,
}: DropDownSearchContentProps) => {
  const { query } = useRouter()
  const [showSearchTipList, setShowSearchTipList] = useState(false)

  const [dataTags] = useQuery(
    getTags,
    { take: 10, where: { keyword: { startsWith: inputSearch, mode: "insensitive" } } },
    {
      ...NO_REFETCH,
      enabled: inputSearch.length > 0 && inputSearch !== String(query.searchText),
    }
  )

  const [skipPopularTags, setSkipPopularTags] = useState(0)
  const [{ tags, hasMore, nextPage }] = usePaginatedQuery(
    getTags,
    {
      skip: skipPopularTags,
      take: 5,
      orderBy: { id: "desc" },
    },
    NO_REFETCH
  )
  const changeSkipPopularTags = () => nextPage && setSkipPopularTags(nextPage.skip)

  useEffect(() => {
    if (dataTags?.tags.length && inputSearch.length && inputSearch !== String(query.searchText)) {
      setShowSearchTipList(true)
    } else {
      setShowSearchTipList(false)
    }
  }, [dataTags, inputSearch, query.searchText])

  return (
    <>
      {showSearchTipList ? (
        <SearchTipList
          onCloseSearchModal={onCloseSearchModal}
          tags={dataTags?.tags ?? []}
          onCloseDropDownSearch={onClose}
        />
      ) : (
        <>
          <HistorySearch
            isMobileView={isMobileView}
            onCloseSearchModal={onCloseSearchModal}
            onCloseDropDownSearch={onClose}
          />
          <MoreInteresting
            onCloseSearchModal={onCloseSearchModal}
            showMoreTags={changeSkipPopularTags}
            hasMoreTags={hasMore}
            tags={tags}
            onCloseDropDownSearch={onClose}
          />
        </>
      )}
    </>
  )
}
