import { ReactNode, useEffect, useState } from "react"
import { range } from "app/core/utils"
import clsx from "clsx"

interface DotsProps {
  count: number
  currentSlide: number
  onChange: ((index: number, item: ReactNode) => void) | undefined
}

export const Dots = ({ count, currentSlide, onChange }: DotsProps) => {
  const [items, setItems] = useState<number[]>([])

  useEffect(() => {
    setItems(range(0, count))
  }, [count])

  return (
    <div className="flex h-4 justify-center gap-2 p-1">
      {items.map((item) => (
        <div
          key={item}
          onClick={(event) => {
            event.preventDefault()
            onChange?.(item, this)
          }}
          className={clsx(
            "h-2 w-2 cursor-pointer rounded-2xl bg-[#222]",
            currentSlide === item ? "opacity-100" : "opacity-40"
          )}
        />
      ))}
    </div>
  )
}
