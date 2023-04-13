import { Icon } from "app/core/UI"
import { forwardRef, RefObject } from "react"

interface DashboardHeaderProps {
  toggleSideBar?: () => void
  toggleMiniSideBar?: () => void
  toggleElement: RefObject<SVGSVGElement>
}

export const DashboardHeader = ({
  toggleSideBar,
  toggleMiniSideBar,
  toggleElement,
}: DashboardHeaderProps) => {
  return (
    <div className="relative flex items-center justify-between border-b-2 border-gray-400 border-opacity-40 py-5 px-[30px]">
      <Icon
        ref={toggleElement}
        onClick={toggleSideBar}
        name="list"
        className="block h-8 w-8 cursor-pointer text-black lg:hidden"
      />
      <Icon
        onClick={toggleMiniSideBar}
        name="list"
        className="hidden h-8 w-8 cursor-pointer text-black lg:block"
      />
      <div className="relative h-10 w-10 cursor-pointer overflow-hidden rounded-full border-2 border-[#95c0d4]">
        <img
          alt=""
          src="https://www.kindpng.com/picc/m/207-2074624_white-gray-circle-avatar-png-transparent-png.png"
          className="absolute left-1/2 top-1/2 h-full w-full -translate-y-1/2 -translate-x-1/2 rounded-full object-cover"
        />
      </div>
    </div>
  )
}
