import { useState } from "react"
import { Image, Offer } from "@prisma/client"

import { CategoriesOverview, Popup, Tooltip } from "app/core/components/index"
import { useProductsTableForAdmin } from "app/core/hooks"

import s from "./ProductsTable.module.css"

const ImagesTable = ({ images }: { images: Image[] }) => {
  return (
    <table className="mt-4 w-full text-center">
      <tr>
        <th className="w-1/6 text-sm font-bold">id</th>
        <th className="w-full text-sm font-bold">url</th>
      </tr>
      {images.map((image) => (
        <tr key={image.id}>
          <td className="w-1/6">{image.id}</td>
          <td className="w-full break-after-all">{image.url}</td>
        </tr>
      ))}
    </table>
  )
}

const OffersTable = ({ offers }: { offers: Offer[] }) => {
  return (
    <table className="mt-4 w-full table-fixed text-center">
      <tr>
        <th className="w-1/5 text-sm font-bold">id</th>
        <th className="w-2/5 text-sm font-bold">name</th>
        <th className="w-1/5 text-sm font-bold">price</th>
        <th className="w-1/5 text-sm font-bold">quantity</th>
      </tr>
      {offers.map((offer) => (
        <tr key={offer.id}>
          <td className="w-1/5">{offer.id}</td>
          <td className="w-2/5">{offer.name}</td>
          <td className="w-1/5">{Number(offer.price)}</td>
          <td className="w-1/5">{Number(offer.quantity)}</td>
        </tr>
      ))}
    </table>
  )
}

const ModalProductProperties = ({ isOpen, onClose, offers, images }) => {
  return (
    <Popup
      overlayProps={{ className: "bg-black opacity-40" }}
      className="h-[600px] w-9/12 overflow-auto bg-white shadow"
      isOpen={isOpen}
      onClose={onClose}
    >
      {offers.length ? <OffersTable offers={offers} /> : <ImagesTable images={images} />}
    </Popup>
  )
}

export const ProductsTable = () => {
  const [products] = useProductsTableForAdmin()

  const [offers, setOffers] = useState<Offer[]>([])
  const [images, setImages] = useState<Image[]>([])
  const [isShowModal, setIsShowModal] = useState(false)

  const onOpenModalProperties = () => setIsShowModal(true)
  const onCloseModalProperties = () => {
    setIsShowModal(false)
    setImages([])
    setOffers([])
  }

  return (
    <div className="flex w-4/5 flex-col items-center">
      <table className="-mt-3 w-full table-fixed text-center">
        <tr>
          <th className="text-sm font-bold">id</th>
          <th className="text-sm font-bold">name</th>
          <th className="text-sm font-bold">offers</th>
          <th className="text-sm font-bold">images</th>
        </tr>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td className="w-10">
              <Tooltip className={s.tooltip} placement="top" title={product.name}>
                <span className="cursor-pointer truncate break-words hover:text-black/60">
                  {product.name}
                </span>
              </Tooltip>
            </td>
            <td
              onClick={() => {
                setOffers(product.offers)
                onOpenModalProperties()
              }}
              className="cursor-pointer hover:text-black/60"
            >
              <span className="border-b border-black">Посмотреть</span>
            </td>
            <td
              onClick={() => {
                setImages(product.images)
                onOpenModalProperties()
              }}
              className="cursor-pointer hover:text-black/60"
            >
              <span className="border-b border-black">Посмотреть</span>
            </td>
          </tr>
        ))}
      </table>
      <ModalProductProperties
        isOpen={isShowModal}
        onClose={onCloseModalProperties}
        offers={offers}
        images={images}
      />
      <CategoriesOverview products={products} />
    </div>
  )
}
