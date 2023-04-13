import { atom } from "jotai"

export interface Filter {
  name: string
  values: number[]
}

export const filtersAtom = atom<Filter[]>([])
