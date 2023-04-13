import { forwardRef } from "react"
import { AnimatePresence, m } from "framer-motion"

import { DropDownSearchContent } from "../index"

import clsx from "clsx"

interface DropDownSearchProps {
  isOpen: boolean
  onClose?: () => void
  inputSearch: string
  isMobileView?: boolean
  onCloseSearchModal?: () => void
}

export const DropDownSearch = forwardRef<HTMLDivElement, DropDownSearchProps>(
  ({ isOpen, inputSearch, onClose, onCloseSearchModal, isMobileView = false }, ref) => {
    return (
      <AnimatePresence>
        {(isOpen || isMobileView) && (
          <m.div
            ref={ref}
            initial={{ scaleX: 0.2, opacity: 0.7 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.2 }}
            className={clsx(
              isMobileView
                ? "fixed left-0 mt-4 w-full px-2"
                : "absolute left-0 top-full mt-1 w-full  w-full overflow-hidden rounded-lg border-[1px] border-gray-500 bg-white py-4 px-1"
            )}
          >
            <DropDownSearchContent
              isMobileView={isMobileView}
              onCloseSearchModal={onCloseSearchModal}
              inputSearch={inputSearch}
              onClose={onClose}
            />
          </m.div>
        )}
      </AnimatePresence>
    )
  }
)
