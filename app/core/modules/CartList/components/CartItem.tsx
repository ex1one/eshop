import { useEffect, useState } from "react"
import { useAtom } from "jotai"
import { Category, Offer, OfferPropCore, Product, Image } from "@prisma/client"

import { CartItemInfo } from "./CartItemInfo"
import { Counter } from "./Counter"
import { CartPrice } from "./CartPrice"

import { useDebounce } from "app/core/hooks"
import { cartItemAtom } from "app/core/atoms"

interface CartItemProps {
  offer: Offer & {
    product: Product & { categories: (Category & { successors: Category[] })[] }
    propsCore: OfferPropCore[]
    image: Image | null
  }
}

export const CartItem = ({ offer }: CartItemProps) => {
  const [cartItems, setCartItems] = useAtom(cartItemAtom)

  const [value, setValue] = useState(
    cartItems.find((item) => item.offerId === offer.id)?.quantity ?? 1
  )
  const debounceValue = useDebounce(value, 300)

  const onChangeQuantity = (value: number) => () =>
    setValue((prev) => (prev === Number(offer.quantity) ? prev : prev + value))

  useEffect(() => {
    setCartItems((prev) =>
      prev.map((item) => (item.offerId === offer.id ? { ...item, quantity: debounceValue } : item))
    )
  }, [debounceValue])

  return (
    <div className="-mx-8 flex items-center px-6 py-5">
      <CartItemInfo offer={offer} />
      <Counter onChangeQuantity={onChangeQuantity} value={value} quantity={offer.quantity} />
      <CartPrice price={Number(offer.price)} debounceValue={debounceValue} />
    </div>
  )
}
