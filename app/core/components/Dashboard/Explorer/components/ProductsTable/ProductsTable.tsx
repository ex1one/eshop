import { Product, Offer } from "@prisma/client"

interface ProductsTableProps {
  products: (Product & { offers: Offer[] })[]
}

export const ProductsTable = ({ products }: ProductsTableProps) => {
  return (
    <div className="rounded-2x mt-5 bg-white px-5 py-4">
      <h1 className="mb-8 text-xl font-bold">ProductsTable</h1>
      <table className="mt-8 w-full table-fixed bg-white">
        <thead>
          <tr className="">
            <th className="relative border border-[#e5ecff] py-1 px-2.5 text-sm">Id</th>
            <th className="relative border border-[#e5ecff] py-1 px-2.5 text-sm">Name</th>
            <th className="relative border border-[#e5ecff] py-1 px-2.5 text-sm">Price</th>
          </tr>
        </thead>
        <tbody className="text-[#7e7172]">
          {!!products.length &&
            products.map((product) => {
              const price = product.offers.map((o) => o.price).sort((a, b) => Number(a) - Number(b))

              return (
                <tr key={product.id}>
                  <td className="px-2.5 py-3.5 text-center">{product.id}</td>
                  <td className="px-2.5 py-3.5 text-center">{product.name}</td>
                  <td className="px-2.5 py-3.5 text-center">
                    {Number(price[0])} - {Number(price[price.length - 1])}
                    <span className="ml-1 text-sm">Рублей</span>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}
