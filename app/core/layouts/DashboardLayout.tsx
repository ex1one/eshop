import { ReactNode, useEffect, useRef, useState } from "react"
import { BlitzLayout, Head, Link, useRouter } from "blitz"

import { SideBar } from "../components/Dashboard/SideBar"
import { DashboardHeader } from "../components/Dashboard/DashboardHeader"
import { useWindowDimensions } from "app/core/hooks"

import clsx from "clsx"
import s from "./DashboardLayout.module.css"

interface DashboardLayoutProps {
  title: string
  children: ReactNode
}

export const DashboardLayout: BlitzLayout<DashboardLayoutProps> = ({ title, children }) => {
  const { pathname } = useRouter()
  const { width } = useWindowDimensions()
  const toggleElement = useRef<SVGSVGElement>(null)

  const [isMiniSideBar, setIsMiniSideBar] = useState(false)
  const [isOpenSideBar, setIsOpenSideBar] = useState(true)

  const toggleSideBar = () => setIsOpenSideBar((prev) => !prev)
  const toggleMiniSideBar = () => setIsMiniSideBar((prev) => !prev)
  const closeSideBar = () => setIsOpenSideBar(false)

  useEffect(() => {
    width && width > 1024 ? setIsOpenSideBar(true) : setIsMiniSideBar(false)
  }, [width])

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SideBar
        width={width}
        toggleElement={toggleElement}
        isMiniSideBar={isMiniSideBar}
        isOpenSideBar={isOpenSideBar}
        closeSideBar={closeSideBar}
        toggleMiniSideBar={toggleMiniSideBar}
      />

      <main
        className={clsx(
          "relative min-h-screen w-full transform overflow-hidden bg-[#f6f7fb] pb-10 duration-500",
          isMiniSideBar ? "lg:pl-[136px]" : "lg:pl-[270px]"
        )}
      >
        <DashboardHeader
          toggleElement={toggleElement}
          toggleMiniSideBar={toggleMiniSideBar}
          toggleSideBar={toggleSideBar}
        />
        <div className="relative min-h-[68vh] p-7 transition duration-500">
          <div className="mx-auto w-full px-4">
            <div className="mb-8 flex items-center">
              <h1 className="mb-1.5 mr-2 text-2xl font-bold">Dashboard</h1>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Link passHref href={pathname}>
                  <a
                    className={clsx(
                      "inline-block cursor-pointer hover:text-black/60 hover:text-black dark:bg-gradient-to-b dark:from-gray-400 dark:to-gray-400 dark:hover:text-gray-300",
                      s.linkUnderline
                    )}
                  >
                    {title}
                  </a>
                </Link>
              </div>
            </div>
            {children}
          </div>
        </div>
      </main>
    </>
  )
}
