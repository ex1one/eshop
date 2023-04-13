import { Suspense, useEffect, useRef, useState } from "react"
import { useRouter } from "blitz"
import { useAtom } from "jotai"

import { searchAtom, searchHistoryAtom } from "app/core/atoms"
import { useDebounce, useOutsideClick } from "app/core/hooks"

import { DropDownSearch } from "../DropDownSearch"

import { m } from "framer-motion"

import { Icon } from "app/core/UI"
import clsx from "clsx"

interface InputSearchBarProps {
  isMobileView?: boolean
  onCloseSearchModal?: () => void
}

export const InputSearchBar = ({
  isMobileView = false,
  onCloseSearchModal,
}: InputSearchBarProps) => {
  const { push, query } = useRouter()
  const [, setSearch] = useAtom(searchAtom)
  const [, setHistorySearch] = useAtom(searchHistoryAtom)

  const [inputSearch, setInputSearch] = useState("")
  const debounceSearch = useDebounce(inputSearch, 400)

  const [showDropDownSearch, setShowDropDownSearch] = useState(false)

  const wrapperInputRef = useRef<HTMLDivElement | null>(null)
  const onCloseDropDownSearch = () => setShowDropDownSearch(false)
  const refDropDown = useOutsideClick<HTMLDivElement>((ref, event) => {
    if (event === ref.current || wrapperInputRef.current?.contains(event as Node)) return

    onCloseDropDownSearch()
  })

  const handleSearch = () => {
    const inputValue = inputSearch.trim()

    onCloseSearchModal?.()
    onCloseDropDownSearch()

    if (inputSearch === "") {
      setSearch("Искать на Eshop")
      setInputSearch("Искать на Eshop")
      return push("/search?searchText=Искать на Eshop")
    }

    setSearch(inputValue)
    setInputSearch(inputValue)
    setHistorySearch((prev) => {
      const existingKeyword = prev.find((k) => k.keyword.toLowerCase() == inputValue.toLowerCase())

      if (existingKeyword) return prev

      return [...prev, { keyword: inputValue }]
    })

    push(`/search?searchText=${inputValue}`)
  }

  useEffect(() => {
    if (query.searchText) {
      setSearch(String(query.searchText))
      setInputSearch(String(query.searchText))
    } else {
      setSearch(undefined)
      setInputSearch("")
    }
  }, [query.searchText])

  return (
    <m.div
      initial={{ scaleX: 0.2, opacity: 0.7 }}
      animate={{ scaleX: 1, opacity: 1 }}
      exit={{ scaleX: 0 }}
      transition={{ duration: 0.2 }}
      className={clsx(
        isMobileView ? "relative h-[30px] w-full" : "relative h-[30px] w-[65%] md:w-[55%]"
      )}
    >
      <div ref={wrapperInputRef} className="h-full w-full">
        <input
          className="z-0 h-[30px] w-full rounded-lg border-[1px] border-gray-300 pl-[30px] text-[15px] outline-none placeholder:text-black/70 hover:border-gray-400 focus:border-gray-500"
          placeholder="Search..."
          value={inputSearch}
          onFocus={() => setShowDropDownSearch(true)}
          onChange={({ target }) => setInputSearch(target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? handleSearch() : undefined)}
        />
        <Icon
          name="search"
          onClick={handleSearch}
          className="absolute top-[8px] left-[10px] h-[14px] w-[14px] cursor-pointer text-black/70"
        />
        <Icon
          name="close"
          onClick={() => setInputSearch("")}
          className={clsx(
            "absolute top-[4px] right-[4px] h-6 w-6 cursor-pointer text-black/70",
            inputSearch === "" ? "pointer-events-none opacity-0" : "opacity-100"
          )}
        />
      </div>

      <Suspense>
        <DropDownSearch
          isMobileView={isMobileView}
          onCloseSearchModal={onCloseSearchModal}
          onClose={onCloseDropDownSearch}
          ref={refDropDown}
          inputSearch={debounceSearch}
          isOpen={showDropDownSearch}
        />
      </Suspense>
    </m.div>
  )
}
