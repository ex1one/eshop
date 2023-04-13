import { FC, ReactNode } from "react"
import { OverlayPopupProps, OverlayPopup } from "app/core/components"
import { Icon } from "app/core/UI"

import clsx from "clsx"

export interface PopupProps {
  children: ReactNode
  isOpen: boolean
  onClose?: () => void
  title?: ReactNode
  hideCloseIcon?: boolean
  overlayProps?: Partial<Omit<OverlayPopupProps, "isOpen" | "onClose">>
  className?: string
  buttonClassName?: string
}

export const Popup: FC<PopupProps> = (props) => {
  const {
    onClose,
    children,
    isOpen,
    title,
    hideCloseIcon = false,
    overlayProps,
    className,
    buttonClassName,
  } = props

  return (
    <OverlayPopup isOpen={isOpen} onClose={onClose} {...overlayProps}>
      <div className={clsx("relative h-full w-full", className)}>
        {title}
        {children}
        {!hideCloseIcon && (
          <button
            className={clsx(
              "absolute top-3 right-5 flex h-8 w-8 cursor-pointer items-center justify-center border-none bg-transparent p-0 outline-none",
              buttonClassName
            )}
            type="button"
            onClick={onClose}
          >
            <Icon name="close" className="h-8 w-8" />
          </button>
        )}
      </div>
    </OverlayPopup>
  )
}
