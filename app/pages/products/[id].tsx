import { Image } from "@prisma/client"
import { Layout } from "app/core/layouts"
import { useState } from "react"

import { ProductSlider, SimilarProductsList } from "app/core/components"
import { ProductProperties } from "app/core/modules"

import getProduct from "app/products/queries/getProduct"

export const Product = ({ product, similarProducts }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [images, setImages] = useState<Image[]>(product.images)

  const onChangeSlider = (index: number) => {
    setCurrentSlide(index)
  }

  const onChangeImages = (image: Image) => {
    setImages((prev) => {
      prev.shift()

      return [image, ...prev]
    })

    onChangeSlider(0)
  }

  return (
    <>
      <div className="mb-4">
        <h1 className="h-full max-h-[176px] overflow-hidden text-3xl font-bold line-clamp-2">
          {product.name}
        </h1>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="mr-8 w-full md:w-[60%]">
          <ProductSlider
            images={images}
            onChange={onChangeSlider}
            selectedSlide={currentSlide}
            showArrows
            showGallery
            showIndicators
            classNameSlide="pt-[75%]"
          />
        </div>
        <ProductProperties onChangeImages={onChangeImages} offers={product.offers} />
      </div>

      <div className="mt-8 h-full w-full">
        <h1 className="mb-2 text-2xl font-bold">You May Like It</h1>
        <SimilarProductsList products={product.categories[0]?.products} />
      </div>
    </>
  )
}

export async function getServerSideProps({ query }) {
  const { product } = await getProduct({ id: Number(query.id) })

  return {
    props: { product },
  }
}

Product.authenticate = false
Product.getLayout = (page) => <Layout title={page.props.product.name}>{page}</Layout>

export default Product
