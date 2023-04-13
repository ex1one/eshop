import { Image, Offer, Product } from "@prisma/client"
import { OfferCard, Pagination } from "app/core/components"
import { ITEMS_PER_PAGE } from "app/core/consts"

import s from "./OffersList.module.css"
import clsx from "clsx"

interface OffersListProps {
  offers: (Offer & {
    product: Product
    image: Image | null
  })[]
}

export const OffersList = ({ offers }: OffersListProps) => {
  return (
    <div className="mt-4 flex flex-col">
      <div
        className={clsx(
          "relative grid grid-cols-1 sx:grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4",
          s.offersList
        )}
      >
        {offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
      <Pagination className="justify-end" count={offers.length} quantityItems={ITEMS_PER_PAGE} />
    </div>
  )
}
