import { Link } from "blitz"
import { Category } from "@prisma/client"

import clsx from "clsx"
import s from "./index.module.css"

export const Categories = ({ categories }: { categories: Category[] }) => {
  return (
    <ul
      className={clsx(
        "flex w-full gap-2 overflow-x-auto overflow-y-hidden text-base md:-mx-2 md:block",
        s.categories
      )}
    >
      {categories.map((category, i) => (
        <li key={category.id} className="mb-2 inline-block w-full">
          <Link passHref href={`/category/${category.id}`}>
            <a className="block cursor-pointer whitespace-nowrap break-normal rounded bg-black/10 p-2 transition duration-200 hover:bg-black/20 hover:text-black/60 md:whitespace-normal md:bg-transparent">
              {category.name}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
