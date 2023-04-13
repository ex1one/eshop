import { formattingPrice } from "app/core/utils"
import { Link } from "blitz"
import { ProductCardProps } from "../ProductCard"

export const ProductInfo = ({ product }: ProductCardProps) => {
  return (
    <Link passHref href={`/products/${product.id}`}>
      <a target="_blank">
        <div className="flex w-full flex-grow flex-col">
          <div className="h-10 max-h-[40px] overflow-hidden align-middle text-sm line-clamp-2">
            {product.name}
          </div>
          <div className="mt-2 text-xl font-bold">
            {formattingPrice(product.offers[0]?.price)} руб.
          </div>
        </div>
      </a>
    </Link>
  )
}
