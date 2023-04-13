import { createContext, Suspense, useContext, useMemo } from "react"
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

type TInitial = NonNullable<Awaited<ReturnType<typeof getServerSideProps>>["props"]>

// const WeedOffersEditorPage = (props: TInitial) => {
const WeedOffersEditorPage = (props: TInitial) => {
  return (
    <div className="bg-gray-100">
      <h1 className="bg-blue-400 px-2 pt-2 pb-2 text-3xl font-black tracking-tight">
        It&apos;s An Explorer, bruh``
      </h1>

      <Suspense fallback={<div>Loading...</div>}>
        <Inner offers={props.offers} />
      </Suspense>
    </div>
  )
}

export async function getServerSideProps({ query }) {
  // let offers = await getWeedOFfers({})
  return {
    props: { offers: await getWeedOffers({}) },
  }
}

const Inner = (props: TInitial) => {
  let offers = props.offers
  // let [offers, { setQueryData }] = useQuery(getWeedOffers, {})

  const addNewOffer = async () => {
    let offer = await invoke(mtEditOffer, {
      data: {},
      isNew: true,
    })
    // setQueryData([...offers, offer as any])
    // setTransactions([...transactions, tran])
  }

  const onDataUpdate = ({ id }: wd_Offer, columnId: string, value: any) => {
    if (columnId == "prices") {
      invoke(mtEditOffer, {
        id,
        isNew: true,
        data: {
          pricess: [JSON.parse(value as any)],
        },
      })
      return true
    }
    let data = {
      [columnId]: value instanceof Date ? value : +value || value,
    }

    invoke(mtEditOffer, {
      id: id,
      data,
      isNew: !id,
    })
  }
  return (
    <div className="overflow-auto">
      {/* <pre>{JSON.stringify(offers, snull, 2)}</pre> */}
      <DataTableInteractive<wd_Offer & { pricess2: string }>
        columns={useGridColumns()}
        data={offers}
        onDataUpdate={onDataUpdate}
        onAddNew={addNewOffer}
      />
    </div>
  )
}

function useGridColumns() {
  let [editOffer] = useMutation(mtEditOffer)
  // const selectApikeys = async () => {
  //   let { apikeys } = await invoke(getApikeys, {})
  //   return apikeys.map((key) => ({
  //     id: key.id,
  //     name: key.name,
  //   }))
  // }
  const del = (e: wd_Offer) => editOffer({ isDel: true, id: e.id })

  return useMemo(() => {
    let cols: TDataTableColumn<wd_Offer & { pricess2: string }>[] = [
      { editable: false, path: "id" },
      { editable: true, path: "name" }, //, type: "datetime" },
      { editable: true, path: "img" }, //, type: "datetime" },
      // { editable: true, path: "prices2" },/]
      { editable: true, path: "sativeness" },
      { editable: true, path: "indicness" },
      { editable: true, path: "thc" },
      { editable: true, path: "cbd" },
      { editable: true, path: "grade" },
      { editable: true, path: "flavours" },
      { editable: true, path: "pricess2" },
      {
        editable: false,
        onCellClick: del,
        format: (e) => 123,
        path: "updatedAt",
      },
      // { editable: tr`ue, path: "prices" },

      // {
      //   editable: true,
      //   path: "apikeyId",
      //   select: selectApikeys,
      //   defaultText: (e) => `${e.apikey?.name} (${e.apikeyId})`,
      //   defaultValue: (e) => e.apikeyId,
      // },
      // { editable: false, path: "createdAt" },
    ]
    return cols
  }, [])
}

const DelBlock = () => {
  let [editOffer] = useMutation(mtEditOffer)
  // let ref = useRef()
  return (
    <div>
      <input type="text" placeholder="offer ID" />
      <button className="btn" onClick={() => 1}>
        Del
      </button>
    </div>
  )
}

WeedOffersEditorPage.authenticate = false

export default WeedOffersEditorPage
