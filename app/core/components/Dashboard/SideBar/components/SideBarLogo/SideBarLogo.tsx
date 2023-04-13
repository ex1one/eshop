import { Image, Link } from "blitz"
import logo from "public/favicon.ico"
import clsx from "clsx"

interface SideBarLogoProps {
  isMiniSideBar: boolean
}

export const SideBarLogo = ({ isMiniSideBar }: SideBarLogoProps) => {
  return (
    <Link passHref href="/">
      <a className="mb-5 flex w-full items-center justify-center gap-1 p-6 text-lg font-bold text-white">
        <Image alt="" className="" src={logo} />
        <div className={clsx(isMiniSideBar && "hidden")}>eShop</div>
      </a>
    </Link>
  )
}
