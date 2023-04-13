import { Popup, Slider } from "app/core/components"
import { Image } from "@prisma/client"
import s from "./GalleryPopUp.module.css"

interface GalleryPopUpProps {
  isOpen: boolean
  images: Image[]
  selectedImage: number
  onClose?: () => void
}

export const GalleryPopUp = ({ isOpen, images, selectedImage, onClose }: GalleryPopUpProps) => {
  return (
    <Popup
      buttonClassName="text-white"
      overlayProps={{ className: "bg-black" }}
      onClose={onClose}
      isOpen={isOpen}
    >
      <div className={s.wrapper}>
        <div className="h-full w-full overflow-hidden">
          <Slider showArrows selectedItem={selectedImage} className="h-full w-full overflow-hidden">
            {images.map((image) => (
              <li key={image.id} className="relative h-0 w-full overflow-hidden p-1 pt-[100%]">
                <img className={s.image} src={image.url} alt="" />
              </li>
            ))}
          </Slider>
        </div>
      </div>
    </Popup>
  )
}
