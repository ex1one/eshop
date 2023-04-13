import { Carousel, CarouselProps } from "react-responsive-carousel"
import { useWindowDimensions } from "app/core/hooks"
import "react-responsive-carousel/lib/styles/carousel.min.css"

import { Icon } from "app/core/UI"
import { Dots } from "./components"
import { clsx } from "clsx"

interface SliderProps extends Partial<CarouselProps> {
  switchHover?: boolean
}

export const Slider = ({
  children,
  switchHover,
  showStatus = false,
  showArrows = false,
  selectedItem = 0,
  showThumbs = false,
  showIndicators = false,
  swipeable = true,
  emulateTouch = true,
  onChange,
  ...other
}: SliderProps) => {
  const { width } = useWindowDimensions()

  const transitionTime = switchHover ? (width && width > 1024 ? 0 : 350) : 350

  const renderArrowNext = (clickHandler: () => void, hasNext: boolean, label: string) => {
    return (
      <div
        onClick={clickHandler}
        className={clsx(
          "absolute top-1/2 right-[12px] z-10 h-10 w-10 -translate-y-1/2 cursor-pointer rounded-3xl bg-white",
          hasNext ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <Icon name="arrow-right" className="mx-auto my-2 h-6 w-6" />
      </div>
    )
  }

  const renderArrowPrev = (clickHandler: () => void, hasPrev: boolean, label: string) => {
    return (
      <div
        onClick={clickHandler}
        className={clsx(
          "absolute top-1/2 left-[12px] z-10 h-10 w-10 -translate-y-1/2 cursor-pointer rounded-3xl bg-white",
          hasPrev ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <Icon name="arrow-left" className="mx-auto my-2 h-6 w-6" />
      </div>
    )
  }

  return (
    <div className="relative">
      <Carousel
        renderArrowNext={renderArrowNext}
        renderArrowPrev={renderArrowPrev}
        onChange={onChange}
        transitionTime={transitionTime}
        showIndicators={false}
        selectedItem={selectedItem}
        showStatus={showStatus}
        showThumbs={showThumbs}
        emulateTouch={emulateTouch}
        showArrows={showArrows}
        {...other}
      >
        {children}
      </Carousel>

      {showIndicators && (
        <Dots count={children?.length!} currentSlide={selectedItem} onChange={onChange} />
      )}

      {switchHover && (
        <div className="absolute top-0 left-0 hidden h-full w-full items-center justify-center lg:flex">
          {children?.map((image, index) => (
            <div
              onMouseEnter={() => onChange?.(index, this)}
              key={index}
              className="h-full w-full"
            />
          ))}
        </div>
      )}
    </div>
  )
}
