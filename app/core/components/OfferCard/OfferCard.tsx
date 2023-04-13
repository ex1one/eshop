import { useRouter } from "blitz"
import { Image, Offer, Product } from "@prisma/client"
import { formattingPrice } from "app/core/utils"

export type OfferCardProps = {
  offer: Offer & {
    product: Product
    image: Image | null
  }
}

export const OfferCard = ({ offer }: OfferCardProps) => {
  const { push } = useRouter()
  const onClick = () => push(`/products/${offer.product?.id}`)

  return (
    <div onClick={onClick} className="flex w-auto cursor-pointer flex-col">
      <div className="overflow-hidden rounded-3xl">
        <div className="relative inline-block h-full w-full overflow-hidden bg-contain bg-cover pt-[100%]">
          <img
            className="absolute left-0 top-0 h-full w-full object-contain object-center"
            src={offer.image?.url}
            alt=""
          />
          <div className="absolute right-0 top-0 left-0 bottom-0 bg-[#222] opacity-10" />
        </div>
      </div>

      <div className="flex w-full flex-grow flex-col">
        <div className="h-10 max-h-[40px] overflow-hidden align-middle text-sm line-clamp-2">
          {offer.name}
        </div>
        <div className="mt-2 text-xl font-bold">{formattingPrice(offer.price)} руб.</div>
      </div>
    </div>
  )
}
