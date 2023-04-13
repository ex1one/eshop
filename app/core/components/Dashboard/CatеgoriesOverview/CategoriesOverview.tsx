import _ from "lodash"
import { PropValueCore } from "@prisma/client"
import { useState } from "react"
import clsx from "clsx"
import { useAtom } from "jotai"
import { selectedCategoriesAtom } from "../../../atoms"

interface PropsListProps {
  name: string
  values: (PropValueCore & { offerPropCoreId: number })[]
}

const PropsList = ({ name, values }: PropsListProps) => {
  const [openValues, setOpenValues] = useState(false)

  return (
    <ul className={clsx("mb-2 h-6", openValues && "h-auto")}>
      <button
        className="mb-2 border-b border-black hover:text-black/60"
        onClick={() => setOpenValues((prev) => !prev)}
      >
        Фильтры - {name}
      </button>
      {openValues && (
        <table className="w-full table-fixed text-center">
          <thead>
            <tr>
              <th className="w-1/5 border border-[#e5ecff] text-sm font-bold">id</th>
              <th className="w-1/5 border border-[#e5ecff] text-sm font-bold">offerPropCoreId</th>
              <th className="w-2/5 border  border-[#e5ecff] text-sm font-bold">value</th>
            </tr>
          </thead>
          <tbody>
            {values.map((value) => (
              <tr key={value.id}>
                <td className="w-1/5">{value.id}</td>
                <td className="w-1/5 truncate">{value.offerPropCoreId}</td>
                <td className="w-2/5 truncate">{value.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </ul>
  )
}

export const CategoriesOverview = ({ products }) => {
  const [selectedCategories] = useAtom(selectedCategoriesAtom)

  const currentCategoriesProducts = products.filter((p) =>
    p.categories.find((c) => selectedCategories.find((item) => item.item.id === c.id))
  )

  const currentCategoriesProps = _(currentCategoriesProducts)
    .flatMap((p) => p.offers.flatMap((o) => o.propsCore.flatMap((i) => i.value)))
    .uniqBy((p) => p.value)
    .groupBy((p) => p.name)
    .entries()
    .map(([key, value]) => ({ name: key, values: value }))
    .value()

  const successorsProducts = products.filter(
    (p) => !p.categories.find((c) => selectedCategories.find((item) => item.item.id === c.id))
  )

  const successorsProductsProps = _(successorsProducts)
    .flatMap((p) =>
      p.offers.flatMap((o) => o.propsCore.flatMap((i) => ({ ...i.value, offerPropCoreId: i.id })))
    )
    .uniqBy((p) => p.value)
    .groupBy((p) => p.name)
    .entries()
    .map(([key, value]) => ({ name: key, values: value }))
    .value()

  if (!selectedCategories.length) return null

  return (
    <div className="mt-8 rounded-2xl bg-white px-5 py-4">
      <h2 className="text-xl font-bold">{selectedCategories.map((c) => c.item.name).join(", ")}</h2>
      <h1 className="text-lg">
        Всего товаров у выбранных категорий - {currentCategoriesProducts.length}
      </h1>
      <h1 className="text-lg">У нижестоящих - {successorsProducts.length}</h1>
      {!!currentCategoriesProps.length && (
        <>
          <h1 className="my-2 text-lg font-bold">Фильтры выбранных категорий</h1>
          {currentCategoriesProps.map((filter) => (
            <PropsList key={filter.name} name={filter.name} values={filter.values} />
          ))}
        </>
      )}
      {!!successorsProductsProps.length && (
        <>
          <h1 className="my-2 text-lg font-bold">Фильтры нижестоящих категорий</h1>
          {successorsProductsProps.map((filter) => (
            <PropsList key={filter.name} name={filter.name} values={filter.values} />
          ))}
        </>
      )}
    </div>
  )
}
