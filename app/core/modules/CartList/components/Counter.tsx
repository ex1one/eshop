import { useEffect, useState } from "react"
import { Icon } from "app/core/UI"
import clsx from "clsx"
import Decimal from "decimal.js"

interface CounterProps {
  onChangeQuantity: (value: number) => () => void
  value: number
  quantity: Decimal | null
}

export const Counter = ({ onChangeQuantity, value, quantity }: CounterProps) => {
  const [plusDisabled, setPlusDisabled] = useState(false)
  const [dashDisabled, setDashDisabled] = useState(false)

  useEffect(() => {
    if (value === 1) {
      setDashDisabled(true)
    } else {
      setDashDisabled(false)
    }
    if (value >= Number(quantity)) {
      setPlusDisabled(true)
    } else {
      setPlusDisabled(false)
    }
  }, [value])

  return (
    <div className="flex w-1/5 items-center justify-center">
      <Icon
        name="dash"
        onClick={!dashDisabled ? onChangeQuantity(-1) : undefined}
        className={clsx("h-5 w-5 cursor-pointer", dashDisabled && "pointer-events-none opacity-20")}
      />
      <span className="w-8 text-center">{value}</span>
      <Icon
        name="plus"
        onClick={!dashDisabled ? onChangeQuantity(1) : undefined}
        className={clsx("h-5 w-5 cursor-pointer", plusDisabled && "pointer-events-none opacity-20")}
      />
    </div>
  )
}
