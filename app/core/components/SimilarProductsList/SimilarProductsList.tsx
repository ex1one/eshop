import { Category, Image, Offer, OfferPropCore, Product, StockValue } from "@prisma/client"
import { ProductCard } from "app/core/components"

import clsx from "clsx"
import s from "./SimilarProductsList.module.css"

interface SimilarProductsListProps {
  products: (Product & {
    categories: (Category & {
      products: (Product & {
        images: Image[]
      })[]
    })[]
    offers: (Offer & {
      image: Image | null
      product: Product
      stocks: StockValue[]
      propsCore: OfferPropCore[]
    })[]
    images: Image[]
  })[]
}

export const SimilarProductsList = ({ products }: SimilarProductsListProps) => {
  return (
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
    </div>
  )
}
