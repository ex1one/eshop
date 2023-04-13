import { ParsedUrlQuery } from "querystring"
import { createFilters } from "app/core/utils"

export const getParams = (query: ParsedUrlQuery) => {
  return {
    maxPrice: query.maxPrice ? Number(query.maxPrice) : undefined,
    minPrice: query.minPrice ? Number(query.minPrice) : 0,
    search: query.searchText ? String(query.searchText) : undefined,
    selectedCategory: query.id ? Number(query.id) : undefined,
    filters: createFilters({
      query,
      params: ["category", "minPrice", "maxPrice", "searchText", "id"],
    }),
  }
}
