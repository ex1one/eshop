import React from "react"
import { m } from "framer-motion"
import { Icon } from "app/core/UI"

interface ButtonSearchBarProps {
  onOpen: () => void
}

export const ButtonSearchBar = ({ onOpen }: ButtonSearchBarProps) => {
  return (
    <m.button
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 0.21 }}
      className="relative h-[30px] w-40 rounded-lg border border-gray-300 pl-[30px] pr-[10px] text-[15px] text-black/70 transition duration-200 hover:border-gray-400"
      onClick={onOpen}
    >
      <div className="flex items-center border-gray-300">
        <span className="h-[20px]">Search</span>
      </div>
      <Icon
        name="search"
        className="absolute top-[7px] left-[10px] h-[14px] w-[14px] text-black/70"
      />
    </m.button>
  )
}
