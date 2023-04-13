import { range } from "app/core/utils"

import s from "../ProductsList.module.css"
import clsx from "clsx"

interface SkeletonProps {
  columns: number
  row: number
}

export const Skeleton = ({ row, columns }: SkeletonProps) => {
  const totalCount = row * columns

  const list = range(1, totalCount)

  return (
    <div className={s.wrapper}>
      <div className="flex flex-col">
        <div
          className={clsx(
            "relative grid grid-cols-1 sx:grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4",
            s.productsList
          )}
        >
          {list.map((listItem) => (
            <div key={listItem} className="flex w-auto cursor-pointer flex-col">
              <div className="overflow-hidden rounded-3xl">
                <div className="relative inline-block h-full w-full overflow-hidden rounded-3xl bg-contain bg-cover pt-[100%]">
                  <div className="absolute right-0 top-0 left-0 bottom-0 bg-[#222] opacity-10" />
                </div>
              </div>

              <div className="mt-2 h-5 w-full bg-gray-100" />
              <div className="mt-2 h-5 w-3/6 bg-gray-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
