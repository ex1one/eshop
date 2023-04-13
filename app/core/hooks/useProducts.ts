import { usePaginatedQuery, useRouter } from "blitz"
import getProducts from "app/products/queries/getProducts"
import { NO_REFETCH } from "app/core/mocks/refetch"
import { useGetParams } from "./useGetParams"

export function useProducts() {
  const { query } = useRouter()

  const [{ products, hasMore, count }, { refetch, isFetching }] = usePaginatedQuery(
    getProducts,
    useGetParams(query),
    NO_REFETCH
  )

  return [products, hasMore, count, isFetching, refetch] as const
}
