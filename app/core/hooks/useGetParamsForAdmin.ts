import {
  filtersAtom,
  maxPriceAtom,
  minPriceAtom,
  searchAtom,
  selectedCategoriesAtom,
} from "app/core/atoms"
import { ITEMS_PER_PAGE } from "app/core/consts"
import { useAtom } from "jotai"
import { ParsedUrlQuery } from "querystring"

export const useGetParamsForAdmin = (query: ParsedUrlQuery) => {
  const page = Number(query.page) || 1

  const [search] = useAtom(searchAtom)
  const [selectedCategories] = useAtom(selectedCategoriesAtom)
  const [filters] = useAtom(filtersAtom)
  const [minPrice] = useAtom(minPriceAtom)
  const [maxPrice] = useAtom(maxPriceAtom)

  return {
    maxPrice,
    minPrice,
    search,
    filters,
    selectedCategories,
    skip: page === 1 ? 0 : ITEMS_PER_PAGE * (page - 1),
    take: ITEMS_PER_PAGE,
  }
}
