import { useState } from "react"
import { useRouter } from "blitz"

import { Image, Offer, OfferPropCore, PropValueCore } from "@prisma/client"
import { Icon } from "app/core/UI"

import clsx from "clsx"
import s from "./ProductPropertiesBlock.module.css"

interface ProductPropertiesBlockProps {
  name: string
  values: (PropValueCore & { images: Image[] })[]
  selectedValue?: PropValueCore
  available: { name: string; values: (OfferPropCore & { offer: Offer })[] } | undefined
  onChange: (value: PropValueCore, image?: Image) => void
}

export const ProductPropertiesBlock = ({
  values,
  name,
  onChange,
  selectedValue,
  available,
}: ProductPropertiesBlockProps) => {
  const { query } = useRouter()
  const [isShowMore, setIsShowMore] = useState(false)

  const onClick = (value: PropValueCore, image?: Image) => () => onChange(value, image)
  const onClickShowMore = () => setIsShowMore((prev) => !prev)

  return (
    <div className="relative">
      <div className="mb-1 flex items-center gap-1">
        <span>{name}</span>
        {values.length > 6 && <span className="">{values.length} вариантов</span>}
        <span className="text-base text-gray-400">{selectedValue?.value}</span>
      </div>
      <div
        className={clsx(
          "relative m-0 flex w-[calc(100%-32px)] flex-wrap items-center gap-2 overflow-x-auto overflow-y-hidden overflow-x-scroll whitespace-nowrap",
          s.list
        )}
        style={{ height: isShowMore ? "auto" : 76 }}
      >
        {values.map((value) => {
          const currentImage = value.images.find((image) => image.productId === Number(query.id))
          const disabled = available?.values.some(
            (p) => p.valueId === value.id || Number(p.offer.quantity) === 0
          )

          return (
            <div
              key={value.id}
              className={clsx(
                "relative box-border inline-flex cursor-pointer items-center justify-center  overflow-hidden rounded-full border-2 object-cover font-bold transition duration-200 hover:border-black/30",
                currentImage
                  ? "mb-[12px] h-[56px] min-h-[56px] w-[56px] min-w-[56px] p-0"
                  : "h-[40px] min-h-[40px] w-[40px] min-w-[40px] p-2",
                selectedValue?.id === value.id && "border-black hover:border-black/50",
                !disabled && "pointer-events-none border-black/30"
              )}
              onClick={onClick(value, currentImage)}
            >
              {currentImage ? (
                <img
                  className={clsx(
                    "h-full w-full rounded-full transition duration-300 hover:scale-90",
                    !disabled && "scale-90"
                  )}
                  src={currentImage.url}
                  alt=""
                />
              ) : (
                <span>{value.value}</span>
              )}
              {!disabled && <div className={s.disabled} />}
            </div>
          )
        })}
        {values.length > 6 && (
          <Icon
            name="arrow-right"
            className={clsx(
              "absolute top-1/2 right-0 hidden h-4 w-4 -translate-y-1/2 rotate-90 cursor-pointer md:block",
              isShowMore && "-rotate-90"
            )}
            onClick={onClickShowMore}
          />
        )}
      </div>
    </div>
  )
}
