import { useAtom } from "jotai"
import { useQuery } from "blitz"
import { useCurrentUser } from "app/core/hooks"
import { OrderItem } from "./components"

import { authModalAtom } from "app/core/atoms"
import { NO_REFETCH } from "app/core/mocks"
import getAllOrders from "app/eshop/orders/queries/getAllOrders"

export const OrderList = () => {
  const user = useCurrentUser()

  const [{ orders }] = useQuery(getAllOrders, { where: { user } }, NO_REFETCH)

  const [, setOpenAuthPopup] = useAtom(authModalAtom)
  const openAuthPopUp = () => setOpenAuthPopup(true)

  return (
    <>
      {user ? (
        !!orders.length ? (
          orders.map((order) => <OrderItem key={order.id} order={order} />)
        ) : (
          <h1 className="text-lg font-bold">Нет заказов</h1>
        )
      ) : (
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Вы не авторизованы</h1>
          <p>
            Для доступа к личному кабинету необходимо{" "}
            <span
              onClick={openAuthPopUp}
              className="cursor-pointer text-blue-600 transition duration-200 hover:text-blue-800"
            >
              войти
            </span>
          </p>
        </div>
      )}
    </>
  )
}
