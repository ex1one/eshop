import { atomWithStorage } from "jotai/utils"

export interface searchHistoryItem {
  keyword: string
}

export const searchHistoryAtom = atomWithStorage<searchHistoryItem[]>("SEA-HIS", [])
