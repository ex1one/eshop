import { Link } from "blitz"
import { SideBarMenuItem } from "../../../interface"
import clsx from "clsx"

interface SideBarMenuItemChildProps extends Omit<SideBarMenuItem, "logo" | "childs"> {
  isMiniSideBar: boolean
}

export const SideBarMenuItemChild = ({ title, link, isMiniSideBar }: SideBarMenuItemChildProps) => {
  return (
    <li className="w-full bg-[#1e1e2d]">
      <Link passHref href={link}>
        <a
          className={clsx(
            "block w-[194px] p-2.5 text-start text-sm text-white hover:text-[#f65365]",
            isMiniSideBar ? "pl-8" : "pl-1.5"
          )}
        >
          {title}
        </a>
      </Link>
    </li>
  )
}
