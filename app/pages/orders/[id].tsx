import { Image, Offer, Order, OrderItem, Product } from "@prisma/client"
import { OfferCard } from "app/core/components"
import { Layout } from "app/core/layouts"
import getOrder from "app/eshop/orders/queries/getOrder"

interface OrderItemPageProps {
  order: Order & {
    items: (OrderItem & {
      offer: Offer & { image: Image | null; product: Product }
    })[]
  }
}

const OrderItemPage = ({ order }: OrderItemPageProps) => (
  <>
    <h1 className="mb-2 text-2xl font-bold">Заказ: {order.link}</h1>
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
      {order.items.map((orderItem) => (
        <OfferCard key={orderItem.id} offer={orderItem.offer} />
      ))}
    </div>
  </>
)

export async function getServerSideProps({ query }) {
  const { order } = await getOrder({ link: query.id })

  return {
    props: { order },
  }
}

OrderItemPage.authenticate = true
OrderItemPage.getLayout = (page) => <Layout>{page}</Layout>

export default OrderItemPage
