import { useQuery, useRouter } from "blitz"
import { Prisma } from "@prisma/client"
import { NO_REFETCH } from "app/core/mocks/refetch"
import { useAtom } from "jotai"
import { searchAtom } from "../atoms"
import getPropCores from "app/eshop/propCore/queries/getPropCores"

export const useFilters = () => {
  const { query } = useRouter()
  const [search] = useAtom(searchAtom)

  const offersWhere: Prisma.OfferWhereInput = {
    name: { contains: search, mode: "insensitive" },
    product: {
      categories: { some: { predecessors: { some: { id: Number(query.id) || undefined } } } },
    },
  }

  const [{ props }] = useQuery(getPropCores, { offersWhere }, NO_REFETCH)

  return { filters: props }
}
