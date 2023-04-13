import { useRouter } from "blitz"
import { usePagination } from "app/core/hooks"
import { PaginationList } from "./components"
import { Icon } from "app/core/UI"
import clsx from "clsx"

interface PaginationProps {
  className?: string
  count: number
  quantityItems: number
  siblingCount?: number
}

export const Pagination = ({ className, quantityItems, count, siblingCount }: PaginationProps) => {
  const { query, push } = useRouter()
  const page = Number(query.page) || 1

  const paginationRange = usePagination({ count, page, siblingCount, quantityItems })
  const lastPage = paginationRange[paginationRange.length - 1]

  const onChangePagination = (page: number) => () =>
    push({ query: { ...query, page } }, undefined, { shallow: true })

  const ArrowRight = () => {
    return (
      <li
        className={clsx(
          "relative flex h-8 w-8 cursor-pointer items-center rounded-2xl p-2 text-center text-lg text-black hover:bg-black/10",
          page === lastPage && "pointer-events-none"
        )}
        onClick={onChangePagination(page + 1)}
      >
        <Icon
          name={"arrow-right"}
          className="absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2"
        />
      </li>
    )
  }

  const ArrowLeft = () => {
    return (
      <li
        className={clsx(
          "relative flex h-8 w-8 cursor-pointer items-center rounded-2xl p-2 text-center text-lg text-black hover:bg-black/10",
          page === 1 && "pointer-events-none"
        )}
        onClick={onChangePagination(page - 1)}
      >
        <Icon
          name={"arrow-left"}
          className="absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2"
        />
      </li>
    )
  }

  if (!paginationRange.length || paginationRange.length == 1) return null

  return (
    <ul className={className}>
      <ArrowLeft />
      <PaginationList
        paginationRange={paginationRange}
        onChangePagination={onChangePagination}
        page={page}
      />
      <ArrowRight />
    </ul>
  )
}
