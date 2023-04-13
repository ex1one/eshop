import { RefObject } from "react"
import { SideBarLogo, SideBarMenu } from "./components"
import { useOutsideClick } from "app/core/hooks"

import s from "./SideBar.module.css"
import clsx from "clsx"

interface SideBarProps {
  isOpenSideBar: boolean
  isMiniSideBar: boolean

  closeSideBar: () => void
  toggleMiniSideBar: () => void
  width: number | null
  toggleElement: RefObject<SVGSVGElement>
}

export const SideBar = ({
  isOpenSideBar,
  closeSideBar,
  isMiniSideBar,
  toggleMiniSideBar,
  toggleElement,
  width,
}: SideBarProps) => {
  const sideBarRef = useOutsideClick<HTMLDivElement>((ref, event) => {
    if (
      event === ref.current ||
      toggleElement.current?.contains(event as Node) ||
      (width && width > 1024)
    )
      return

    closeSideBar()
  })

  return (
    <div
      ref={sideBarRef}
      className={clsx(
        s.wrapper,
        "fixed left-0 top-0 z-10 flex h-screen transform flex-col items-center pb-12 duration-300",
        isMiniSideBar
          ? "h-auto w-[136px] overflow-visible"
          : "w-[270px] overflow-hidden overflow-y-auto",
        isOpenSideBar ? "left-0" : "-left-[280px]"
      )}
    >
      <SideBarLogo isMiniSideBar={isMiniSideBar} />
      <SideBarMenu isMiniSideBar={isMiniSideBar} />
    </div>
  )
}
