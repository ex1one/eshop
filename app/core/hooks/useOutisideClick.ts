import { RefObject, useCallback, useEffect, useRef } from "react"

export const useOutsideClick = <T extends HTMLElement>(
  onClick: (ref: RefObject<T>, event?: HTMLElement) => void
) => {
  const ref = useRef<T>(null)

  const handleClick = useCallback(
    ({ target }: MouseEvent): void => {
      const inside = ref.current?.contains(target as Node)

      if (inside) return

      onClick(ref, target as HTMLElement)
    },
    [onClick, ref]
  )

  useEffect(() => {
    document.addEventListener("click", handleClick)

    return () => document.removeEventListener("click", handleClick)
  }, [handleClick])

  return ref
}
