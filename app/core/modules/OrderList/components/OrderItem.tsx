import { Link } from "blitz"
import { Order } from "@prisma/client"
import { Icon } from "app/core/UI"

interface OrderItemProps {
  order: Order
}

export const OrderItem = ({ order }: OrderItemProps) => (
  <div className="mb-2 rounded bg-white p-2 shadow" key={order.link}>
    <div className="mb-2 flex items-center justify-between">
      <p className="text-lg">Заказ - {order.link}</p>
      <p className="font-bold">{+order.sum} рублей</p>
    </div>
    <div>
      <Link passHref href={`/orders/${order.link}`}>
        <a className="flex max-w-fit cursor-pointer items-center gap-1 transition duration-200 hover:text-black/60">
          Перейти к заказу
          <Icon name="arrow-right" className="h-4 w-4 " />
        </a>
      </Link>
    </div>
  </div>
)
