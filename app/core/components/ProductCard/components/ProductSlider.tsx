import { useState } from "react"
import { Image, Product } from "@prisma/client"
import { Slider, GalleryPopUp } from "app/core/components"
import { CarouselProps } from "react-responsive-carousel"
import clsx from "clsx"

interface ProductSliderProps extends Partial<CarouselProps> {
  classNameSlide?: string
  switchHover?: boolean
  selectedSlide: number
  showGallery?: boolean
  images: Image[]
}

export const ProductSlider = ({
  classNameSlide,
  switchHover = false,
  selectedSlide,
  showGallery = false,
  images,
  ...other
}: ProductSliderProps) => {
  const [isShowGallery, setIsShowGallery] = useState(false)

  const onClickImage = () => setIsShowGallery(true)
  const onCloseGallery = () => setIsShowGallery(false)

  return (
    <>
      <Slider
        switchHover={switchHover}
        selectedItem={selectedSlide}
        className="overflow-hidden rounded-3xl"
        {...other}
      >
        {images.map((image, index) => (
          <div
            className={clsx(
              "relative inline-block h-full w-full overflow-hidden bg-contain bg-cover",
              classNameSlide
            )}
            onClick={onClickImage}
            key={`${image.id}+${index}`}
          >
            <img
              className="absolute left-0 top-0 h-full w-full object-contain object-center"
              src={image.url}
              alt=""
            />
            <div className="absolute right-0 top-0 left-0 bottom-0 bg-[#222] opacity-10" />
          </div>
        ))}
      </Slider>

      {showGallery && (
        <GalleryPopUp
          onClose={onCloseGallery}
          isOpen={isShowGallery}
          images={images}
          selectedImage={selectedSlide}
        />
      )}
    </>
  )
}
