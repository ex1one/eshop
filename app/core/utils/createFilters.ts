import { Filter } from "app/core/atoms"
import { removeQueryParams } from "./removeQueryParams"
import { ParsedUrlQuery } from "querystring"

interface createFiltersProps {
  query: ParsedUrlQuery
  params: string[] | string
}

export const createFilters = ({ params, query }: createFiltersProps): Filter[] => {
  const filters: Filter[] = []
  const newQuery = removeQueryParams({ query, params })

  for (let filter in newQuery) {
    const valueFilters = (newQuery[filter] as string).split(",").map(Number)
    filters.push({ name: filter, values: valueFilters })
  }

  return filters
}
