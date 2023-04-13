import { useAtom } from "jotai"
import { useRouter } from "blitz"
import { useCallback, useRef, FocusEvent } from "react"
import { removeQueryParams } from "app/core/utils"
import { maxPriceAtom, minPriceAtom } from "app/core/atoms"

function useHookWithRefCallback() {
  const { query } = useRouter()
  const maxRef = useRef<HTMLInputElement | null>(null)
  const minRef = useRef<HTMLInputElement | null>(null)

  const setRefMax = useCallback(
    (node: HTMLInputElement, reset = false) => {
      if (reset) node.value = ""

      if (node && !reset) {
        node.value = query.maxPrice ? String(query.maxPrice) : ""
      }

      maxRef.current = node
    },
    [query.maxPrice]
  )

  const setRefMin = useCallback(
    (node: HTMLInputElement, reset = false) => {
      if (reset) node.value = ""

      if (node && !reset) {
        node.value = query.minPrice ? String(query.minPrice) : ""
      }

      minRef.current = node
    },
    [query.minPrice]
  )

  return { setRefMax, setRefMin }
}

interface FilterPriceProps {}

export const FilterPrice = ({}: FilterPriceProps) => {
  const { query, push } = useRouter()
  const { setRefMin, setRefMax } = useHookWithRefCallback()

  const [, setMinPrice] = useAtom(minPriceAtom)
  const [, setMaxPrice] = useAtom(maxPriceAtom)

  const onBlur = (event: FocusEvent<HTMLInputElement>) => {
    switch (event.currentTarget.name) {
      case "minPrice":
        return event.currentTarget.value.charAt(0) !== "0" && event.currentTarget.value !== ""
          ? changePath(event.currentTarget.value, "minPrice")
          : reset("minPrice", event.currentTarget.value)
      case "maxPrice":
        return event.currentTarget.value.charAt(0) !== "0" && event.currentTarget.value !== ""
          ? changePath(event.currentTarget.value, "maxPrice")
          : reset("maxPrice", event.currentTarget.value)
      default:
        return
    }
  }

  const reset = (field: "minPrice" | "maxPrice", value: string) => {
    if (query[field] && (value === "0" || value === ""))
      push({ query: removeQueryParams({ query, params: field }) }, undefined, {
        shallow: true,
      }).then(() => (field === "minPrice" ? setMinPrice(0) : setMaxPrice(undefined)))
  }

  const changePath = (value: string, field: "minPrice" | "maxPrice") => {
    if (value === query[field]) return

    push({ query: { ...query, [field]: value } }, undefined, { shallow: true }).then(() =>
      field === "minPrice" ? setMinPrice(Number(value)) : setMaxPrice(Number(value))
    )
  }

  return (
    <div className="pb-4">
      <h2 className="mb-2 text-2xl">Цена</h2>
      <div className="flex items-center gap-2">
        <div className="flex w-full flex-col gap-1">
          <label className="text-sm">From</label>
          <input
            name="minPrice"
            onBlur={onBlur}
            onPaste={(event) => event.preventDefault()}
            onKeyPress={(event) => {
              const keyCode = event.keyCode || event.which
              const keyValue = String.fromCharCode(keyCode)
              if (!/^(([1-9]\d*)|0)(.\d+)?$/.test(keyValue)) event.preventDefault()
              if (event.currentTarget.value == "0") event.preventDefault()
              if (event.currentTarget.value == "0" && keyValue !== "0")
                event.currentTarget.value = keyValue
            }}
            ref={setRefMin}
            className="box-border h-full w-full cursor-text overflow-hidden rounded-3xl border border-black/20 bg-none px-3 py-2 text-base outline-none hover:border-black/70 focus:border-black/70"
            type="text"
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <label className="text-sm">To</label>
          <input
            onBlur={onBlur}
            onPaste={(event) => event.preventDefault()}
            onKeyPress={(event) => {
              const keyCode = event.keyCode || event.which
              const keyValue = String.fromCharCode(keyCode)
              if (!/^(([1-9]\d*)|0)(.\d+)?$/.test(keyValue)) event.preventDefault()
              if (event.currentTarget.value == "0") event.preventDefault()
              if (event.currentTarget.value == "0" && keyValue !== "0")
                event.currentTarget.value = keyValue
            }}
            name="maxPrice"
            ref={setRefMax}
            className="box-border h-full w-full cursor-text overflow-hidden rounded-3xl border border-black/20 bg-none px-3 py-2 text-base outline-none hover:border-black/70 focus:border-black/70"
            type="text"
          />
        </div>
      </div>
    </div>
  )
}
