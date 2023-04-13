import { Suspense } from "react"
import { Category } from "@prisma/client"

import { Categories } from "app/core/components"
import { ProductsList } from "app/core/modules"

import { Layout } from "app/core/layouts"
import getCategories from "app/categories/queries/getCategories"

import clsx from "clsx"
import s from "./index.module.css"

interface HomePageProps {
  categories: Category[]
}

const Home = ({ categories }: HomePageProps) => (
  <div className="flex flex-row flex-wrap justify-between pt-4">
    <div className={clsx(s.sidebar, "w-full")}>
      <h1 className="mb-2 font-bold tracking-tight">Categories</h1>
      <Categories categories={categories} />
    </div>

    <Suspense
      fallback={
        <div className="relative flex flex-grow items-center justify-center">
          <div className="absolute top-10 h-6 w-6 animate-spin rounded-full border-2 border-solid border-red-600 border-t-transparent" />
        </div>
      }
    >
      <ProductsList />
    </Suspense>
  </div>
)

export async function getServerSideProps() {
  const { categories } = await getCategories({ where: { parentId: null } })

  return {
    props: { categories },
  }
}

Home.authenticate = false
Home.getLayout = (page) => <Layout title="eShop">{page}</Layout>

export default Home
