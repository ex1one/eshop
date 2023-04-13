import { createContext, Suspense, useContext } from "react"
import { Category } from "@prisma/client"

import { Categories } from "app/core/components"

import { Layout } from "app/core/layouts"
import getCategories from "app/categories/queries/getCategories"

import clsx from "clsx"
import { BlitzPage, useMutation, useParam, useQuery } from "blitz"
import { TWeedOffer, WEED_OFFERS } from "app/weed/mock"
import getWeedOrder from "app/weed/queries/getWeedOrder"
import Pingeon from "app/core/Pingeon"
import mtPing from "app/weed/mutations/mtPing"

interface HomePageProps {
  categories: Category[]
}

const WeedOrderPage: BlitzPage = ({}: HomePageProps) => {
  let link = useParam("link", "string")!

  return (
    <div className="">
      <h1 className="mb-2 text-2xl font-bold">Order: {link}</h1>

      <Suspense>
        <Inner />
      </Suspense>
    </div>
  )
}

const Inner = () => {
  let link = useLink()

  let [order] = useQuery(getWeedOrder, { link: link! })
  let [ping] = useMutation(mtPing)

  const doPing = () =>
    ping({
      msg: `Received payment for #${order.link} order. Total: ${order.totalG}g. Contact customer asap`,
    })

  return (
    <>
      <div>Total G: {order.totalG}</div>
      <h1 className="text-xl font-bold">Pay Here:</h1>
      <img
        className="block w-32 h-32"
        src="https://i.pinimg.com/564x/60/c1/4a/60c14a43fb4745795b3b358868517e79.jpg"
      />
      <div className="border border-blue-600 border-y-4 ml-10 mb-10 p-16 p-l-8">
        <div> poka</div>
        <div>kak dela</div>
        <div>privet</div>
        <img src="https://i.imgur.com/n9vyz5L.png" width={120} />
      </div>

      <button
        className="w-full cursor-pointer  rounded bg-gray-800 p-2 font-bold text-white text-center"
        onClick={doPing}
      >
        {"I've Paid"}
      </button>
    </>
  )
}

const WeedOfferCtx = createContext<TWeedOffer>(undefined as any)

const WeedOffer = ({ offer }: { offer: TWeedOffer }) => {
  return (
    <WeedOfferCtx.Provider value={offer}>
      <div className="flex border bg-red-100">
        <div className="bg-cyan-200 w-24 h-24"></div>
        <div className="pl-4 pt-2 grow">
          <div className="font-black text-2xl ">{offer.name}</div>
          <div className="flex space-x-4 text-sm"></div>
        </div>
      </div>
    </WeedOfferCtx.Provider>
  )
}
export async function getServerSideProps() {
  return {
    props: {},
  }
}

function useLink() {
  let link = useParam("link", "string")!
  console.log("link", link)
  return link!
}

WeedOrderPage.authenticate = false
// WeedTestMenuPage.getLayout = (page) => <Layout title="eShop">{page}</Layout>

export default WeedOrderPage
