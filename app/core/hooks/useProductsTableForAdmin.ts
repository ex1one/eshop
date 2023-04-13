import { usePaginatedQuery, useRouter } from "blitz"
import getProductsForAdmin from "app/products/queries/getProductsForAdmin"
import { NO_REFETCH } from "app/core/mocks/refetch"
import { useGetParamsForAdmin } from "app/core/hooks"

export function useProductsTableForAdmin() {
  const { query } = useRouter()

  const [{ products, hasMore, count }, { refetch, isFetching }] = usePaginatedQuery(
    getProductsForAdmin,
    useGetParamsForAdmin(query),
    NO_REFETCH
  )

  return [products, hasMore, count, isFetching, refetch] as const
}
