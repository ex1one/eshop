import { Link } from "blitz"
import { useState } from "react"
import { Image, Offer, Product } from "@prisma/client"
import { ProductInfo, ProductSlider } from "./components"

export type ProductCardProps = {
  product: Product & {
    offers: Offer[]
    images: Image[]
  }
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const onChangeSlider = (index: number) => setCurrentSlide(index)

  return (
    <div className="flex w-auto cursor-pointer flex-col">
      <Link passHref href={`/products/${product.id}`}>
        <a target="_blank">
          <ProductSlider
            images={product.images}
            selectedSlide={currentSlide}
            onChange={onChangeSlider}
            classNameSlide="pt-[100%]"
            switchHover
            showIndicators
          />
        </a>
      </Link>

      <ProductInfo product={product} />
    </div>
  )
}
