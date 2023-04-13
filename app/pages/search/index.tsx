import { useAtom } from "jotai"
import { useHydrateAtoms } from "jotai/utils"
import { Suspense, useEffect, useState } from "react"
import { useRouter } from "blitz"
import { Category, PropCore, PropValueCore } from "@prisma/client"

import { ModalFilters, SearchHeader, TTreeItem } from "app/core/components"
import { Layout } from "app/core/layouts"
import { ProductsList, SideBar, Skeleton } from "app/core/modules"

import { searchAtom, selectedCategoryAtom, treeAtom } from "app/core/atoms"
import { createSearchTree, createTree, offersWhere } from "app/core/utils"

import getCategories from "app/categories/queries/getCategories"
import getPropCores from "app/eshop/propCore/queries/getPropCores"

interface SearchPageProps {
  searchTree: { category: Category; successors: Category[] }[]
  filters: (PropCore & { values: PropValueCore[] })[]
  categories: (Category & { childs: Category[]; successors: Category[] })[]
  selectedCategoryId: number | undefined
  searchText: string
}

const Search = ({
  searchTree,
  filters,
  categories,
  selectedCategoryId,
  searchText,
}: SearchPageProps) => {
  useHydrateAtoms([
    [selectedCategoryAtom, selectedCategoryId],
    [searchAtom, searchText],
  ])

  const { query } = useRouter()

  const [tree, setTree] = useAtom(treeAtom)
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom)

  const [currentCategory, setCurrentCategory] = useState<TTreeItem | undefined>(undefined)
  const [isOpenFilters, setIsOpenFilters] = useState(false)
  const onToggleOpenFilters = () => setIsOpenFilters((prev) => !prev)

  useEffect(() => {
    setTree(createTree({ categories }))
  }, [categories])

  useEffect(() => {
    query.category && setSelectedCategory(Number(query.id))

    setCurrentCategory(tree.find((item) => item.item.id === Number(query.id)))
  }, [query.id, tree])

  return (
    <>
      {searchTree.length || selectedCategory ? (
        <>
          <SearchHeader currentCategory={currentCategory} />
          <div className="mt-0 flex-col justify-between gap-4 md:mt-10 md:flex md:flex-row">
            <SideBar
              currentCategory={currentCategory}
              searchTree={searchTree}
              filters={filters}
              onToggleOpenFilters={onToggleOpenFilters}
            />
            <Suspense fallback={<Skeleton columns={4} row={4} />}>
              <ProductsList />
            </Suspense>
          </div>

          <ModalFilters
            currentCategory={currentCategory}
            searchTree={searchTree}
            filters={filters}
            isOpen={isOpenFilters}
            onClose={onToggleOpenFilters}
          />
        </>
      ) : (
        <h1 className="text-2xl font-bold">Ничего не нашли попробуйте ещё раз</h1>
      )}
    </>
  )
}

export async function getServerSideProps({ query }) {
  const { categories } = await getCategories({})
  const searchTree = await createSearchTree(query.searchText ? String(query.searchText) : undefined)
  const { props } = await getPropCores({
    offersWhere: offersWhere(query.id ? Number(query.id) : undefined),
  })

  return {
    props: {
      searchTree,
      filters: props,
      categories,
      selectedCategoryId: query.id ? Number(query.id) : undefined,
      searchText: String(query.searchText),
    },
  }
}

Search.authenticate = false
Search.getLayout = (page) => {
  return <Layout title={`${page.props.searchText} купить на Eshop`}>{page}</Layout>
}

export default Search
