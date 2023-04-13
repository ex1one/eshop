import { useRouter } from "blitz"
import { useCallback, useRef } from "react"

export const useHookWithRefCallback = <T extends HTMLInputElement>() => {
  const { query } = useRouter()
  const ref = useRef<HTMLInputElement | null>(null)

  const setRef = useCallback(
    (node: T, reset = false) => {
      if (reset) node.value = ""

      if (node && !reset) {
        node.value = query.searchText ? String(query.searchText) : ""
      }

      ref.current = node
    },
    [query.searchText]
  )

  return [ref, setRef]
}
