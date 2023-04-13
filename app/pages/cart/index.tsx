import { Layout } from "app/core/layouts"
import { BlitzPage } from "blitz"
import { useAtom } from "jotai"
import { cartItemAtom } from "app/core/atoms"
import { OrderSummary, ShoppingCart } from "app/core/components"

const Cart: BlitzPage = () => {
  const [cartItems] = useAtom(cartItemAtom)

  return (
    <>
      {cartItems.length ? (
        <div className="my-10 flex justify-between gap-4">
          <ShoppingCart />
          <OrderSummary />
        </div>
      ) : (
        <>
          <h1 className="mb-2 text-2xl font-bold">Корзина пуста</h1>
          <p>Добавьте чего-нибудь в корзину</p>
        </>
      )}
    </>
  )
}
Cart.getLayout = (page) => <Layout title="Корзина">{page}</Layout>

export default Cart
