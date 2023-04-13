import { useAtom } from "jotai"
import { useEffect } from "react"
import { Loader, Pagination, ProductCard } from "app/core/components"

import { useProducts } from "app/core/hooks"
import { ITEMS_PER_PAGE } from "app/core/consts"
import { countAtom } from "app/core/atoms"

import s from "./ProductsList.module.css"
import clsx from "clsx"

export const ProductsList = () => {
  const [products, , count, isFetching] = useProducts()
  const [, setCount] = useAtom(countAtom)

  useEffect(() => {
    setCount(count)
  }, [count])

  return (
    <div className={s.wrapper}>
      <div className="flex flex-col">
        <div
          className={clsx(
            "relative grid grid-cols-1 sx:grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4",
            s.productsList
          )}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Pagination
          className="mt-4 flex items-center justify-end gap-1"
          count={count}
          quantityItems={ITEMS_PER_PAGE}
        />
        <Loader isShow={isFetching} />
      </div>
    </div>
  )
}
