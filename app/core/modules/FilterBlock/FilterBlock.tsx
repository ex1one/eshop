import { useEffect } from "react"
import { PropValueCore } from "@prisma/client"
import { useRouter } from "blitz"
import { useAtom } from "jotai"
import { filtersAtom } from "app/core/atoms"
import { AccordionItem } from "../../components/AccordionItem"
import { m } from "framer-motion"

import { Icon } from "app/core/UI"
import clsx from "clsx"

interface FilterBlockProps {
  name: string
  values: PropValueCore[]
}

export const FilterBlock = ({ values, name }: FilterBlockProps) => {
  const { push, query } = useRouter()
  const [filters, setFilters] = useAtom(filtersAtom)

  const onChangeFilters = (value: PropValueCore) => () => {
    let { [name]: queryValue, ...other } = query
    let values = (query[value.name] as string | undefined)?.split(",").map(Number) ?? []

    values.includes(value.id)
      ? (values = values.filter((v) => v !== value.id))
      : values.push(value.id)

    values.length
      ? setFilters((prev) =>
          prev.length
            ? prev.map((filter) => (filter.name === name ? { name, values } : filter))
            : [...prev, { name, values }]
        )
      : setFilters((prev) => prev.filter((filter) => filter.name !== name))

    values.length
      ? push({ query: { ...other, [value.name]: values.map(String).join(",") } }, undefined, {
          shallow: true,
        })
      : push({ query: { ...other } }, undefined, { shallow: true })
  }

  useEffect(() => {
    for (let filter in query) {
      if (filter === name) {
        const valueFilters = (query[filter] as string).split(",").map(Number)

        setFilters((prev) => [...prev, { name, values: valueFilters }])
      }
    }
  }, [])

  return (
    <AccordionItem
      title={name}
      className="my-2 bg-neutral-100 p-2  text-sm"
      content={
        <ul className="pb-2">
          {values.map((value) => (
            <m.li
              onClick={onChangeFilters(value)}
              className={clsx(
                "flex cursor-pointer items-center gap-2 transition duration-200 hover:text-black/60",
                filters.some(
                  (filter) => filter.name && value.name && filter.values.includes(value.id)
                ) && "font-medium"
              )}
              key={value.id}
            >
              <Icon
                className="h-3 w-3"
                name={
                  filters.some(
                    (filter) => filter.name && value.name && filter.values.includes(value.id)
                  )
                    ? "check-square-fill"
                    : "square"
                }
              />
              <span>{value.value}</span>
            </m.li>
          ))}
        </ul>
      }
    />
  )
}
