import { RefObject, useEffect, useState } from "react"

export const useHover = <T extends HTMLElement = HTMLElement>(elementRef: RefObject<T>) => {
  const [isHover, setIsHover] = useState<boolean>(false)

  const handleMouseEnter = () => setIsHover(true)
  const handleMouseLeave = () => setIsHover(false)

  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.addEventListener("mouseenter", handleMouseEnter)
      elementRef.current.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (elementRef.current) {
        elementRef.current.removeEventListener("mouseenter", handleMouseEnter)
        elementRef.current.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [elementRef.current])

  return isHover
}
