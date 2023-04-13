import { atom } from "jotai"
import { TTreeItem } from "app/core/components"

export const selectedCategoryAtom = atom<number | undefined>(undefined)
export const selectedCategoriesAtom = atom<TTreeItem[]>([])
