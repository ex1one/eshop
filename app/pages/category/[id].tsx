import { useAtom } from "jotai"
import { useHydrateAtoms } from "jotai/utils"
import { Suspense, useEffect, useState } from "react"
import { Category, PropCore, PropValueCore } from "@prisma/client"
import { BlitzPage, Head, useRouter } from "blitz"

import { Layout } from "app/core/layouts"
import { createTree, offersWhere } from "app/core/utils"

import { BreadCrumbs, Chips, ModalFilters, TTreeItem } from "app/core/components"
import { ProductsList, SideBar, Skeleton } from "app/core/modules"

import { selectedCategoryAtom, treeAtom } from "app/core/atoms"

import getCategories from "app/categories/queries/getCategories"
import getPropCores from "app/eshop/propCore/queries/getPropCores"

interface CategoryProps {
  filters: (PropCore & { values: PropValueCore[] })[]
  categories: (Category & { childs: Category[]; successors: Category[] })[]
  selectedCategoryId: number
}

const CategoryPage: BlitzPage = ({ filters, categories, selectedCategoryId }: CategoryProps) => {
  useHydrateAtoms([[selectedCategoryAtom, selectedCategoryId]])

  const { query } = useRouter()

  const [currentCategory, setCurrentCategory] = useState<TTreeItem | undefined>(undefined)
  const [, setSelectedCategory] = useAtom(selectedCategoryAtom)
  const [tree, setTree] = useAtom(treeAtom)

  const [isOpenFilters, setIsOpenFilters] = useState(false)
  const onToggleOpenFilters = () => setIsOpenFilters((prev) => !prev)

  useEffect(() => {
    setTree(createTree({ categories }))
  }, [categories])

  useEffect(() => {
    setSelectedCategory(Number(query.id))

    setCurrentCategory(tree.find((item) => item.item.id === Number(query.id)))
  }, [query.id, tree])

  return (
    <>
      <Head>
        <title>{currentCategory?.item.name}</title>
      </Head>

      <div className="pt-2">
        <BreadCrumbs currentCategory={currentCategory} />
        <Chips currentCategory={currentCategory} />
      </div>

      <div className="mt-0 flex-col justify-between gap-4 md:mt-10 md:flex md:flex-row">
        <SideBar
          searchTree={[]}
          currentCategory={currentCategory}
          onToggleOpenFilters={onToggleOpenFilters}
          filters={filters}
        />
        <Suspense fallback={<Skeleton columns={4} row={4} />}>
          <ProductsList />
        </Suspense>
      </div>

      <ModalFilters
        searchTree={[]}
        filters={filters}
        currentCategory={currentCategory}
        isOpen={isOpenFilters}
        onClose={onToggleOpenFilters}
      />
    </>
  )
}

export async function getServerSideProps({ query }) {
  const { categories } = await getCategories({})
  const { props } = await getPropCores({
    offersWhere: offersWhere(query.id ? Number(query.id) : undefined),
  })

  return {
    props: {
      categories,
      filters: props,
      selectedCategoryId: Number(query.id),
    },
  }
}

CategoryPage.authenticate = false
CategoryPage.getLayout = (page) => <Layout>{page}</Layout>

export default CategoryPage
