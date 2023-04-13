import { atom } from "jotai"
import { TTreeItem } from "../components"

export const treeAtom = atom<TTreeItem[]>([])
