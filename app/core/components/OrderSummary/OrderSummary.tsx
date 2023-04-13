import { useAtom } from "jotai"
import { useMutation } from "blitz"
import { useCurrentUser } from "app/core/hooks"
import { toast } from "react-toastify"

import { cartItemAtom } from "app/core/atoms/cart"
import { authModalAtom } from "app/core/atoms"

import createOrder from "app/orders/mutations/createOrder"

export const OrderSummary = () => {
  const user = useCurrentUser()
  const [cartItems, setCartItems] = useAtom(cartItemAtom)
  const [, setOpenAuthPopup] = useAtom(authModalAtom)

  const [onCreateNewOrder] = useMutation(createOrder)

  const onClick = () => {
    if (!user) return setOpenAuthPopup(true)

    onCreateNewOrder({ items: cartItems }).then(() => {
      setCartItems([])
      toast.success("Добавлено в заказы", { hideProgressBar: true, autoClose: 1000 })
    })
  }

  return (
    <div className="sticky top-[68px] h-fit min-w-[350px] bg-white py-4 px-10 shadow">
      <h1 className="border-b pb-8 text-2xl font-semibold">Order Summary</h1>
      <div className="mt-10 mb-5 flex justify-between">
        <span className="text-sm font-semibold uppercase">Items {cartItems.length}</span>
        <span className="text-sm font-semibold">
          {cartItems.reduce((count, item) => Number(item.price) * item.quantity + count, 0)}$
        </span>
      </div>
      <div className="mt-8 border-t">
        <div className="flex justify-between py-6 text-sm font-semibold uppercase">
          <span>Total cost</span>
          <span>
            ${cartItems.reduce((count, item) => Number(item.price) * item.quantity + count, 0)}
          </span>
        </div>
        <button
          onClick={onClick}
          className="w-full bg-red-600 py-3 text-sm font-semibold uppercase text-white hover:bg-red-500"
        >
          Checkout
        </button>
      </div>
    </div>
  )
}
