import { useAtom } from "jotai"
import { cartItemAtom } from "app/core/atoms/cart"
import { Suspense } from "react"
import { CartList } from "app/core/modules"

export const ShoppingCart = () => {
  const [cartItems] = useAtom(cartItemAtom)

  return (
    <div className="w-full bg-white py-4 px-10 shadow">
      <div className="flex justify-between border-b pb-8">
        <h1 className="text-2xl font-semibold">Shopping Cart</h1>
        <h2 className="text-2xl font-semibold">{cartItems.length} Items</h2>
      </div>
      <div className="mt-10 mb-5 flex">
        <h3 className="w-2/5 text-xs font-semibold uppercase text-gray-600">Product Details</h3>
        <h3 className="w-1/5 text-center text-center text-xs font-semibold uppercase text-gray-600">
          Quantity
        </h3>
        <h3 className="w-1/5 text-center text-center text-xs font-semibold uppercase text-gray-600">
          Price
        </h3>
        <h3 className="w-1/5 text-center text-center text-xs font-semibold uppercase text-gray-600">
          Total
        </h3>
      </div>

      <Suspense
        fallback={
          <div className="relative flex justify-center">
            <div className="absolute h-6 w-6 animate-spin rounded-full border-2 border-solid border-black border-t-transparent" />
          </div>
        }
      >
        <CartList />
      </Suspense>
    </div>
  )
}
