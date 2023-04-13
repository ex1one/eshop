import { atomWithStorage } from "jotai/utils"

export interface CartItem {
  offerId: number
  quantity: number
  price: number
}

export const cartItemAtom = atomWithStorage<CartItem[]>("cart-items", [])
