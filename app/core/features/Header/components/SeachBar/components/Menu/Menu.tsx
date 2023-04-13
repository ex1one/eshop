import { useAtom } from "jotai"
import { useRef, useState } from "react"
import { Link, useRouter } from "blitz"
import { AnimatePresence, m } from "framer-motion"

import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { useOutsideClick } from "app/core/hooks/useOutisideClick"
import { authModalAtom } from "app/core/atoms/authModal"
import { Icon } from "app/core/UI"

import s from "./Menu.module.css"

export const Menu = () => {
  const user = useCurrentUser()
  const { push } = useRouter()

  const [, setIsOpenPopupAuth] = useAtom(authModalAtom)
  const [isPopupMenu, setIsPopup] = useState(false)

  const refButton = useRef<HTMLButtonElement>(null)
  const refPopUp = useOutsideClick<HTMLDivElement>((ref, event) => {
    if (event === ref.current || refButton.current?.contains(event as Node)) return

    setIsPopup(false)
  })

  const handleUserInfoClick = () => {
    if (!user) {
      setIsPopup(false)
      setIsOpenPopupAuth(true)
    }
  }

  return (
    <>
      <ul className="hidden flex-row gap-4 md:flex">
        <li
          onClick={handleUserInfoClick}
          className="flex cursor-pointer flex-col items-center justify-center gap-1 text-xs transition duration-300 hover:text-black/60"
        >
          <Icon name="user" className="h-[25px] w-[25px]" />
          {user ? "Profile" : "Login"}
        </li>

        <li>
          <Link passHref href="/orders">
            <a className="flex cursor-pointer flex-col items-center justify-center gap-1 text-xs transition duration-300 hover:text-black/60">
              <Icon name="orders" className="h-[25px] w-[25px]" />
              Orders
            </a>
          </Link>
        </li>

        <li>
          <Link passHref href="/cart">
            <a className="flex cursor-pointer flex-col items-center justify-center gap-1 text-xs transition duration-300 hover:text-black/60">
              <Icon name="bag" className="h-[25px] w-[25px]" />
              Cart
            </a>
          </Link>
        </li>
        {/*<ThemeToggle />*/}
      </ul>

      <m.button
        className="md:hidden"
        ref={refButton}
        onClick={() => setIsPopup((prev) => !prev)}
        whileTap={{ scaleX: 1.3 }}
      >
        <Icon name="three-dots" className="h-5 w-5" />
      </m.button>

      <AnimatePresence>
        {isPopupMenu && (
          <m.div
            ref={refPopUp}
            className="absolute top-[35px] right-[1px] flex flex-col rounded-tl-md rounded-br-md rounded-bl-md border-[1px] border-black/20 bg-white/90 font-light md:hidden "
            initial={{ opacity: 0, height: 125, width: 126 }}
            animate={{ opacity: 1, height: 125, width: 126 }}
            exit={{ opacity: 0, height: 125, width: 126 }}
            transition={{ duration: 0.23 }}
          >
            <div className="relative">
              <m.div
                className={s.popupTriangle}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ duration: 0.1, delay: 0.05 }}
              />

              <nav className="px-5 py-2">
                <m.div
                  className="mb-[4px] flex flex-row items-center p-1"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={menuItemAnim}
                  onClick={handleUserInfoClick}
                >
                  <Icon name="user" className="mr-[5px] h-[16px] w-[16px]" />
                  {user ? (
                    <span className="w-10 truncate">{user.name ?? user.email}</span>
                  ) : (
                    <span>Login</span>
                  )}
                </m.div>

                <m.div
                  className="mb-[4px] flex flex-row items-center overflow-hidden p-1"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={menuItemAnim}
                  onClick={() => {
                    push("/orders")
                    setIsPopup(false)
                  }}
                >
                  <Icon name="orders" className="mr-[5px] h-[16px] w-[16px]" />
                  <span>Orders</span>
                </m.div>

                <m.div
                  className="flex flex-row items-center overflow-hidden p-1"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={menuItemAnim}
                  onClick={() => {
                    push("/cart")
                    setIsPopup(false)
                  }}
                >
                  <Icon name="bag" className="mr-[5px] h-[16px] w-[16px]" />
                  <span>Cart</span>
                </m.div>
              </nav>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}

const menuItemAnim = {
  initial: {
    scaleX: 0,
  },
  animate: {
    scaleX: 1,
    transition: {
      delay: 0.14,
    },
  },
  exit: {
    scaleX: 0,
    scaleY: 0.6,
    opacity: 0.5,
    transition: {
      duration: 0.15,
    },
  },
}
