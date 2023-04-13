import { useAtom } from "jotai"
import { useQuery } from "blitz"

import getOffers from "app/eshop/offers/queries/getOffers"

import { cartItemAtom } from "app/core/atoms/cart"
import { NO_REFETCH } from "app/core/mocks/refetch"
import { CartItem } from "./components"

export const CartList = () => {
  const [cartItems] = useAtom(cartItemAtom)
  const [{ offers }] = useQuery(
    getOffers,
    { offersId: cartItems.map((item) => item.offerId) },
    NO_REFETCH
  )

  return (
    <>
      {offers.map((offer) => (
        <CartItem key={offer.id} offer={offer} />
      ))}
    </>
  )
}
