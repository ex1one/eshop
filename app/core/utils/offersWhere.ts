import { Prisma } from "@prisma/client"

export const offersWhere = (id: number | undefined): Prisma.OfferWhereInput => {
  return {
    product: {
      categories: { some: { predecessors: { some: { id: id } } } },
    },
  }
}
