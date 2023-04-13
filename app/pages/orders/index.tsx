import { Suspense } from "react"
import { BlitzPage } from "blitz"
import { Layout } from "app/core/layouts"
import { OrderList } from "app/core/modules"

export const OrdersPage: BlitzPage = () => {
  return (
    <div className="flex flex-wrap justify-between">
      <div className="w-full">
        <p className="mb-4 text-3xl font-bold">Заказы</p>
        <Suspense
          fallback={
            <div className="relative flex justify-center">
              <div className="absolute h-6 w-6 animate-spin rounded-full border-2 border-solid border-black border-t-transparent" />
            </div>
          }
        >
          <OrderList />
        </Suspense>
      </div>
    </div>
  )
}

OrdersPage.authenticate = false
OrdersPage.getLayout = (page) => <Layout title="Заказы">{page}</Layout>

export default OrdersPage
