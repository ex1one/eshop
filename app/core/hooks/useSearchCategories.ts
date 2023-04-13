import { Prisma } from "@prisma/client"
import { useRouter } from "blitz"

export function useSearchCategories(): Prisma.CategoryWhereInput {
  const { query } = useRouter()

  return {
    products: {
      some: {
        offers: {
          some: {
            name: {
              contains: String(query.searchText) || undefined,
              mode: "insensitive",
            },
          },
        },
      },
    },
  }
}
