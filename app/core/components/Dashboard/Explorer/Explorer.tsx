import { Suspense } from "react"
import { useProductsTableForAdmin } from "app/core/hooks"
import { CategoriesTree } from "../CategoriesTree"
import { CategoriesOverview } from "../CatеgoriesOverview"
import { ProductsTable } from "./components"

export const Explorer = () => {
  const [products] = useProductsTableForAdmin()

  return (
    <>
      <Suspense>
        <CategoriesTree />
      </Suspense>

      <CategoriesOverview products={products} />
      <ProductsTable products={products} />
    </>
  )
}
