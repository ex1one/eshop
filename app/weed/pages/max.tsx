import { createContext, Suspense, useContext, useMemo, useState } from "react"
import { Category, wd_Offer } from "@prisma/client"

import { Categories } from "app/core/components"

import { Layout } from "app/core/layouts"
import getCategories from "app/categories/queries/getCategories"

import clsx from "clsx"
import s from "./index.module.css"
import { TWeedOffer, WEED_OFFERS } from "../mock"
// import { BlitzPage } from "@blitzjs/auth"
import { useWeedCart } from "../store"
import mtPlaceOrder from "../mutations/mtPlaceOrder"
import { BlitzPage, invoke, Routes, useMutation, useQuery, useRouter } from "blitz"
import { atom, useAtom } from "jotai"
import { WeedCardDtx } from "../WeedCardDtx"
import { DataTableInteractive, TDataTableColumn } from "../unsorted/DataTable/DataTableInteractive"
import getWeedOffers from "../queries/getWeedOffers"
import mtEditOffer from "../mutations/mtEditOffer"

interface HomePageProps {}

const MaxFirstStepsPage: BlitzPage = ({}: HomePageProps) => {
  let a = "asd"
  let b = 123
  let c = {
    fld1: 1,
    pole2: "stroka",
    pole3: b,
    pole: cambala(),
  }
  return (
    <div className="bg-gray-100">
      <h1 className="bg-blue-400 px-2 pt-2 pb-2 text-3xl font-black tracking-tight">
        It&apos;s An mx, bruh
      </h1>
      <div>{a}</div>
      <pre className="m-2 p-4 bg-red-400">{JSON.stringify(c, null, 4)}</pre>
      <Compo initialValue={10} incrementValue={5} />
      <Compo />
      <Compo />
      <div className="flex flex-wrap space-x-3">
        <Compo />
        <div className="bg-green-200 p-1 grow  shrink-0 w-64">salam </div>
        <Compo />
        <Compo />
        <Compo />
        <Compo />
      </div>
      <div className="m-4 border border-red-400 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Compo />
        <div className="bg-green-200 p-1 grow  shrink-0 w-64">salam </div>
        <Compo />
        <Compo />
        <Compo />
        <Compo />
      </div>
    </div>
  )
}

function cambala() {
  return 1
}

interface Props {
  initialValue?: number // начальное значение счетчика, опциональное
  incrementValue?: number // значение наращивания счетчика при клике на кнопку, опциональное
}

function Compo({ initialValue = 66, incrementValue = 1 }: Props) {
  let [count, setCount] = useState(initialValue)

  return (
    <div className="jh border-2 border-red-600 rounded-lg">
      <div className="border border-emerald-500 mt-2">sdfsdf {count}</div>
      <button
        onClick={() => setCount(count + incrementValue)}
        className="bg-blue-800 font-bold text-white px-2 py-1 mt-2 rounded-lg"
      >
        push
      </button>
    </div>
  )
}

// function Compo() {
//   let [count, setCount] = useState(66)
//   return (
//     <div className="jh border-2 border-red-600 rounded-lg">
//       <div className="border border-emerald-500 mt-2">sdfsdf {count}</div>
//       <button
//         onClick={() => setCount(count + 1)}
//         className="bg-blue-800 font-bold text-white px-2 py-1 mt-2 rounded-lg"
//       >
//         push
//       </button>
//     </div>
//   )
// }

MaxFirstStepsPage.authenticate = false

export default MaxFirstStepsPage
