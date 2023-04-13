import { useAtom } from "jotai"
import { cartItemAtom } from "app/core/atoms"
import { Image, Offer } from "@prisma/client"
import { Link } from "blitz"

interface CartItemInfo {
  offer: Offer & { image: Image | null }
}

export const CartItemInfo = ({ offer }: CartItemInfo) => {
  const [, setCartItems] = useAtom(cartItemAtom)

  const remove = (offerId: number) => {
    setCartItems((prev) => prev.filter((item) => item.offerId !== offerId))
  }

  return (
    <div className="flex w-2/5">
      <div className="max-[80px] w-full">
        <Link passHref href={`/products/${offer.productId}`}>
          <a>
            <img className="h-auto  w-full max-w-[80px]" src={offer.image?.url ?? ""} alt="" />
          </a>
        </Link>
      </div>
      <div className="ml-4 flex flex-grow flex-col gap-2">
        <Link passHref href={`/products/${offer.productId}`}>
          <a className="overflow-hidden text-sm font-bold line-clamp-3">{offer.name}</a>
        </Link>
        <button
          onClick={() => remove(offer.id)}
          className="w-full border-none text-start text-xs font-semibold outline-none hover:text-black/20"
        >
          Remove
        </button>
      </div>
    </div>
  )
}
