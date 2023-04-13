import { Link, useRouter } from "blitz"
import clsx from "clsx"

interface PaginationListProps {
  paginationRange: (number | string)[]
  page: number
  onChangePagination: (page: number) => () => void
}

export const PaginationList = ({
  page,
  onChangePagination,
  paginationRange,
}: PaginationListProps) => {
  const { query } = useRouter()

  return (
    <>
      {paginationRange.map((pageNumber, index) => (
        <li key={`${pageNumber}+${index}`} onClick={onChangePagination(+pageNumber)}>
          <Link shallow href={{ query: { ...query, page: pageNumber } }} passHref>
            <a
              className={clsx(
                "relative flex h-8 w-8 cursor-pointer items-center rounded-2xl p-2 text-center text-lg text-black hover:bg-black/10",
                pageNumber === page && "bg-black/20"
              )}
            >
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {pageNumber}
              </span>
            </a>
          </Link>
        </li>
      ))}
    </>
  )
}
