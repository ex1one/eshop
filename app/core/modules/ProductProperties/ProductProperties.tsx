import { useRouter } from "blitz"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"

import {
  Category,
  Image,
  Offer,
  OfferPropCore,
  Product,
  PropCore,
  PropValueCore,
} from "@prisma/client"
import { removeQueryParams } from "app/core/utils"
import { ProductPropertiesBlock } from "./components"

import { cartItemAtom } from "app/core/atoms"

import clsx from "clsx"
import _ from "lodash"

interface ProductPropertiesProps {
  offers: (Offer & {
    product: Product & { categories: (Category & { successors: [] })[] }
    propsCore: (OfferPropCore & {
      values: PropValueCore[]
      value: PropValueCore
      offer: Offer
      prop: PropCore & { values: (PropValueCore & { images: Image[] })[] }
    })[]
    image: Image
  })[]
  onChangeImages: (image: Image) => void
}

export const ProductProperties = ({ offers, onChangeImages }: ProductPropertiesProps) => {
  const { query, replace } = useRouter()
  const [cartItems, setCartItems] = useAtom(cartItemAtom)

  const props = _(offers)
    .flatMap((offer) =>
      offer.propsCore.map((prop) => ({
        name: prop.prop.name,
        id: prop.prop.id,
        values: prop.prop.values,
      }))
    )
    .uniqBy((prop) => prop.id)
    .value()

  console.log(props)

  const [offer, setOffer] = useState<
    | (Offer & {
        propsCore: (OfferPropCore & {
          value: PropValueCore
          prop: PropCore & { values: (PropValueCore & { images: Image[] })[] }
        })[]
      })
    | undefined
  >(offers.find((o) => Number(o.quantity) !== 0))
  const [available, setAvailable] = useState<
    { name: string; values: (OfferPropCore & { offer: Offer })[] }[]
  >(() => {
    const availableProps: { name: string; values: (OfferPropCore & { offer: Offer })[] }[] = []

    for (const prop of props) {
      const initialValue = offer?.propsCore.find((p) => p.value.name === prop.name)

      const availableOffers = offers
        .filter((o) => o.propsCore.find((p) => p.value.value === initialValue?.value.value))
        .flatMap((o) => o.propsCore)
        .filter((p) => p.value.value !== initialValue?.value.value)

      availableProps.push({ name: availableOffers[0]?.prop.name!, values: availableOffers })
    }

    return availableProps
  })

  const [selectedProps, setSelectedProps] = useState<{ [key: string]: PropValueCore | undefined }>(
    () => {
      let newProps = {}

      for (const prop of props) {
        newProps[prop.name] = offer?.propsCore.find((p) => p.value.name === prop.name)?.value
      }

      return newProps
    }
  )

  const addItemToCart = () => {
    const existingOffer = cartItems.find((item) => item.offerId === offer?.id)

    existingOffer
      ? replace("/cart", undefined, { shallow: true })
      : setCartItems((prev) => [
          ...prev,
          { offerId: offer?.id!, price: Number(offer?.price), quantity: 1 },
        ])
  }

  const onChangeProps = (value: PropValueCore, image?: Image) => {
    const currentProp = selectedProps[value.name]

    if (currentProp?.id === value.id) {
      const availableOffers = offers
        .flatMap((o) => o.propsCore)
        .filter((p) => p.value.value !== value.value && p.value.name !== value.name)

      setAvailable((prev) =>
        prev.map((a) =>
          a.name === availableOffers[0]?.prop.name ? { ...a, values: availableOffers } : a
        )
      )
    } else {
      const availableOffers = offers
        .filter((o) => o.propsCore.find((p) => p.value.value === value.value))
        .flatMap((o) => o.propsCore)
        .filter((p) => p.value.value !== value.value)

      setAvailable((prev) =>
        prev.map((a) =>
          a.name === availableOffers[0]?.prop.name ? { ...a, values: availableOffers } : a
        )
      )
    }

    setSelectedProps((prev) => ({
      ...prev,
      [value.name]: prev[value.name]?.value === value.value ? undefined : value,
    }))

    image && onChangeImages(image)
  }

  useEffect(() => {
    const currentOffer = offers.find((o) =>
      o.propsCore.every((item) => selectedProps[item.value.name]?.id == item.value.id)
    )

    if (currentOffer) {
      replace({ query: { ...query, sku_id: currentOffer.id } }, undefined, { shallow: true })

      setOffer(currentOffer)
    } else {
      replace({ query: removeQueryParams({ query, params: ["sku_id"] }) }, undefined, {
        shallow: true,
      }).then(() => setOffer(undefined))
    }
  }, [selectedProps])

  const [price] = useState(
    offers
      .map((o) => o.price)
      .sort((a, b) => Number(a) - Number(b))
      .map(Number)
  )

  return (
    <div className="relative w-full md:w-[40%]">
      <div className="w-full md:absolute lg:pb-8">
        <div className="flex flex-col">
          {props.map((prop) => (
            <ProductPropertiesBlock
              selectedValue={selectedProps[prop.name]}
              onChange={onChangeProps}
              available={available.find((a) => a.name === prop.name)}
              key={prop.id}
              values={prop.values}
              name={prop.name}
            />
          ))}
          <div className="mb-2 text-2xl font-bold">
            Цена - {offer ? Number(offer?.price) : `${price[0]} - ${price[price.length - 1] ?? ""}`}{" "}
            рублей
          </div>
          <div className="w-full">
            <button
              onClick={offer ? addItemToCart : undefined}
              className={clsx(
                "h-[56px] w-full cursor-pointer rounded-2xl rounded bg-gray-800 p-2 font-bold text-white md:max-w-[240px]"
              )}
            >
              {cartItems.find((item) => item.offerId === offer?.id) ? (
                <>
                  <span className="block text-base font-bold">В корзине</span>
                  <span className="block text-sm font-bold text-gray-400">Перейти</span>
                </>
              ) : (
                "В корзину"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
