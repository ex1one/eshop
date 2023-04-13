import { FC, ReactNode, useEffect, useState } from "react"
import { createPortal } from "react-dom"

interface PortalProps {
  children?: ReactNode
}

export const Portal: FC<PortalProps> = ({ children }) => {
  const element = document.querySelector("#portal")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => {
      setMounted(false)
    }
  }, [])

  if (!element) {
    return null
  }

  return mounted ? createPortal(children, element) : null
}
