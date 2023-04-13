import { useEffect, useState } from "react"
import { useRouter } from "blitz"

import { AnimatePresence } from "framer-motion"
import { useWindowDimensions } from "app/core/hooks"

import { ButtonSearchBar, InputSearchBar, SearchModal } from "./components"

export const SearchBar = () => {
  const { query } = useRouter()

  const [showSearchModal, setShowSearchModal] = useState(false)
  const [isBarOpen, setIsBarOpen] = useState(!!query.searchText)

  const { width } = useWindowDimensions()
  const onCloseSearchModal = () => setShowSearchModal(false)

  const onHandleOpen = () => {
    if (width && width < 768) return setShowSearchModal(true)

    setIsBarOpen(true)
  }

  useEffect(() => {
    if (width && width < 768) setIsBarOpen(false)
  }, [width])

  return (
    <div className="ml-[-29px] flex w-full items-center justify-center md:ml-0">
      <AnimatePresence>
        {isBarOpen ? <InputSearchBar /> : <ButtonSearchBar onOpen={onHandleOpen} />}
      </AnimatePresence>
      <AnimatePresence>
        <SearchModal onClose={onCloseSearchModal} isOpen={showSearchModal} />
      </AnimatePresence>
    </div>
  )
}
