import { useState } from "react"
import { Popup } from "app/core/components"
import { LoginForm, SignupForm } from "app/core/modules"

import s from "./AuthModal.module.css"
import clsx from "clsx"

interface AuthModalProps {
  onClose: () => void
  isOpen: boolean
}

export const AuthModal = ({ onClose, isOpen }: AuthModalProps) => {
  const [isLoginForm, setIsLoginForm] = useState(true)

  const changeForm = () => setIsLoginForm((prev) => !prev)

  return (
    <Popup
      overlayProps={{ className: "bg-black p-2 opacity-40" }}
      className={clsx(
        "max-w-[400px] overflow-hidden overflow-y-scroll rounded-[4px] bg-white px-4 py-4 shadow-md",
        s.modal
      )}
      hideCloseIcon
      onClose={onClose}
      isOpen={isOpen}
    >
      {isLoginForm ? <LoginForm changeForm={changeForm} /> : <SignupForm changeForm={changeForm} />}
    </Popup>
  )
}
