import { useMemo } from "react"
import { range } from "app/core/utils"

const DOTS = "..."

export interface usePaginationProps {
  count: number
  page: number
  quantityItems: number
  siblingCount?: number
}

export const usePagination = ({
  count,
  page,
  quantityItems,
  siblingCount = 1,
}: usePaginationProps): (number | string)[] => {
  return useMemo<(number | string)[]>(() => {
    const totalPageCount = Math.ceil(count / quantityItems)

    const totalPageNumbers = siblingCount + 5

    if (totalPageNumbers >= totalPageCount) {
      return [...range(1, totalPageCount + 1)]
    }

    const leftSiblingIndex = Math.max(page - siblingCount, 1)
    const rightSiblingIndex = Math.min(page + siblingCount, totalPageCount)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount
      let leftRange = range(1, leftItemCount + 1)

      return [...leftRange, DOTS, totalPageCount]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount
      let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount + 1)

      return [firstPageIndex, DOTS, ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex + 1)
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }

    return []
  }, [count, quantityItems, siblingCount, page])
}
