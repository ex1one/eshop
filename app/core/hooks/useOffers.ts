import { useAtom } from "jotai"
import { filtersAtom, searchAtom, selectedCategoryAtom } from "app/core/atoms"
import { usePaginatedQuery, useRouter } from "blitz"
import getOffers from "app/eshop/offers/queries/getOffers"
import { NO_REFETCH } from "app/core/mocks/refetch"
import { ITEMS_PER_PAGE } from "app/core/consts"

export function useOffers() {
  const { query } = useRouter()
  const page = Number(query.page) || 1

  const [selectedCategory] = useAtom(selectedCategoryAtom)
  const [search] = useAtom(searchAtom)
  const [filters] = useAtom(filtersAtom)

  const [{ offers, hasMore, count }, { refetch, isFetching }] = usePaginatedQuery(
    getOffers,
    {
      skip: page === 1 ? 0 : ITEMS_PER_PAGE * (page - 1),
      take: ITEMS_PER_PAGE,
      search,
      selectedCategory,
      filters,
    },
    NO_REFETCH
  )

  return [offers, hasMore, count, isFetching, refetch] as const
}
