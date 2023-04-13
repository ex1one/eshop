interface CartPriceProps {
  price: number
  debounceValue: number
}

export const CartPrice = ({ price, debounceValue }: CartPriceProps) => {
  return (
    <>
      <span className="w-1/5 text-center text-sm font-semibold">${price}</span>
      <span className="w-1/5 text-center text-sm font-semibold">${price * debounceValue}</span>
    </>
  )
}
