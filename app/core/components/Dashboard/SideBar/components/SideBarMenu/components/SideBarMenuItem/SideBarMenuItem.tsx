import { useEffect, useRef, useState } from "react"
import { Link } from "blitz"
import { AnimatePresence, m } from "framer-motion"

import { SideBarMenuItem as ISideBarMenuItem } from "../../interface"
import { SideBarMenuItemChild } from "./components"

import { Icon } from "app/core/UI"

import { useHover } from "app/core/hooks"

import s from "./SideBarMenuItem.module.css"
import clsx from "clsx"

interface SideBarMenuItemProps extends ISideBarMenuItem {
  isMiniSideBar: boolean
  selectedMenuItem?: string
  onSelectedMenuItem: (title: string) => void
}

export const SideBarMenuItem = ({
  link,
  title,
  logo,
  childs,
  isMiniSideBar,
  selectedMenuItem,
  onSelectedMenuItem,
}: SideBarMenuItemProps) => {
  const [isActive, setIsActive] = useState(title === selectedMenuItem)
  const [isOpenChilds, setIsOpenChilds] = useState(false)

  const ref = useRef<HTMLLIElement>(null)
  const isHoverElement = useHover<HTMLLIElement>(ref)

  const handleClick = () => {
    onSelectedMenuItem(title)

    setIsActive((prev) => !prev)
    setIsOpenChilds((prev) => !prev)
  }

  return (
    <li
      onClick={handleClick}
      ref={ref}
      className={clsx("relative mr-5", isMiniSideBar && "mr-0 w-[136px] text-center")}
    >
      <div
        className={clsx(
          s.link,
          isMiniSideBar && [
            s.miniLink,
            isActive && s.activeMiniLink,
            "w-[136px]",
            (isHoverElement || isActive) && "w-[330px] text-[#f65365]",
          ]
        )}
      >
        <div className={clsx(isMiniSideBar && "w-[136px]")}>
          <Icon name={logo} className="mx-auto h-6 w-6 text-[#8eb8cc]" />
        </div>
        <div className={clsx(isMiniSideBar && !isHoverElement && !isActive && "hidden")}>
          {title}
          <Icon
            name="arrow-right"
            className={clsx(
              "absolute right-[12px] top-1/2 h-4 w-4 -translate-y-1/2 font-bold text-white transition duration-300",
              isOpenChilds && "rotate-90"
            )}
          />
        </div>
      </div>

      <AnimatePresence>
        {isOpenChilds && (
          <m.ul
            onClick={(e) => e.stopPropagation()}
            initial={{ top: 0, opacity: 0 }}
            animate={{ top: "100%", opacity: 1 }}
            transition={{ duration: 0.4 }}
            exit={{ top: 0, opacity: 0 }}
            className={clsx(s.childList, isMiniSideBar && s.miniChildList)}
          >
            {childs.map((child) => (
              <SideBarMenuItemChild isMiniSideBar={isMiniSideBar} key={child.title} {...child} />
            ))}
          </m.ul>
        )}
      </AnimatePresence>
    </li>
  )
}
