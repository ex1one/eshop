import { atom, useAtom } from "jotai"
import _ from "lodash"

type TWeedCart = { [key: string]: number }
const cartAtom = atom<TWeedCart>({})

export function useWeedCart() {
  let [items, setItems] = useAtom(cartAtom)

  const get = (id: number) => items[id] || 0
  const set = (id: number, count: number) => setItems((c) => ({ ...items, [id]: count }))
  const totalG = () => _.sum(Object.values(items))

  return { items, get, set, totalG }
}

// export { cart }
