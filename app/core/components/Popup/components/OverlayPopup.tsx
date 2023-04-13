import { FC, ReactNode, useEffect } from "react"
import { Portal } from "app/core/components"
import clsx from "clsx"

export interface OverlayPopupProps {
  children: ReactNode
  isOpen: boolean
  onClose?: () => void
  isCloseOnClick?: boolean
  className?: string
}

export const OverlayPopup: FC<OverlayPopupProps> = (props) => {
  const { children, isOpen, onClose, isCloseOnClick = true, className } = props

  const onClick = () => (isCloseOnClick && onClose ? onClose() : undefined)

  useEffect(() => {
    const closePopup = (event: KeyboardEvent) => {
      if (event.key === "Escape" && onClose && isCloseOnClick) {
        onClose()
      }
    }

    if (isOpen) {
      document.body.style.overflow = "hidden"
      document.addEventListener("keydown", closePopup)
    } else {
      document.body.style.overflow = "auto"
      document.removeEventListener("keydown", closePopup)
    }

    return () => {
      document.body.style.overflow = "auto"
      document.removeEventListener("keydown", closePopup)
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  return (
    <Portal>
      <div
        className="fixed left-0 top-0 bottom-0 right-0 z-10 flex items-center justify-center"
        role="dialog"
      >
        <div
          className={clsx(
            "absolute top-0 right-0 bottom-0 left-0 h-full w-full cursor-pointer overflow-hidden",
            className
          )}
          aria-label="overlay"
          role="button"
          tabIndex={0}
          onClick={onClick}
        />
        {children}
      </div>
    </Portal>
  )
}
