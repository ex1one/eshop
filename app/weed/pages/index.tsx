import { createContext, Suspense, useContext } from "react"
import { Category, wd_Offer } from "@prisma/client"

import { Categories } from "app/core/components"

import { Layout } from "app/core/layouts"
import getCategories from "app/categories/queries/getCategories"
import getWeedOFfers from "../queries/getWeedOffers"
import clsx from "clsx"
import s from "./index.module.css"
import { TWeedOffer, WEED_OFFERS } from "../mock"
// import { BlitzPage } from "@blitzjs/auth"
import { useWeedCart } from "../store"
import mtPlaceOrder from "../mutations/mtPlaceOrder"
import {
  BlitzPage,
  GetServerSidePropsResult,
  Routes,
  useMutation,
  useQuery,
  useRouter,
} from "blitz"
import { atom, useAtom } from "jotai"
import { WeedCardDtx } from "../WeedCardDtx"
import { Plate } from "../unsorted/Plate"
import { WeedsTable } from "../components/WeedsTable"

type ViewModes = "v0" | "dis-v1"
const viewAtom = atom<ViewModes>("dis-v1")
const pageViewAtom = atom<"menu" | "table">("menu")

type TInitial = NonNullable<Awaited<ReturnType<typeof getServerSideProps>>["props"]>
const WeedTestMenuPage: BlitzPage = (props: TInitial) => (
  <div className="bg-gray-100">
    <h1 className="bg-blue-400 px-2 pt-2 pb-2 text-3xl font-black tracking-tight">
      It&apos;s A TreeSeller, bruh
    </h1>

    <Suspense fallback={<div>Loading...</div>}>
      <Inner {...props} />
    </Suspense>
  </div>
)

export async function getServerSideProps({ query }) {
  // let offers = await getWeedOFfers({})
  return {
    props: { offers: await getWeedOFfers({}) },
  }
}

const Inner = ({ offers }: TInitial) => {
  const [view] = useAtom(viewAtom)
  const [pageView, setPageView] = useAtom(pageViewAtom)
  let cls =
    view == "dis-v1"
      ? "grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-4 md:gap-6 p-4 md:p-6"
      : ""

  // let toDisplay = WEED_OFFERS.slice(0, 20)
  // let [offe   rs] =..Ї useQuery(getWeedOFїferї,s, {})
  let toDisplay = offers
  return (
    <div>
      <div className="bg-green-200 px-2 py-1 xl">Average processing time: 17 mins</div>
      <HeadButtons />
      <div>
        <button onClick={() => setPageView(pageView == "table" ? "menu" : "table")}>
          Change View
        </button>
      </div>
      <div>
        {pageView == "menu" ? (
          <div className={cls}>
            {toDisplay.map((o, i) => (
              <WeedOffer key={i} offer={o} />
            ))}
          </div>
        ) : (
          <div>
            <h1>TableView</h1>
            <div>
              <WeedsTable data={toDisplay} />
            </div>
          </div>
        )}
        <PlaceOrder />
      </div>
    </div>
  )
}

// 24.11.1992 - is
// 24 Nov 1992

// 5 april 1998

export const WeedOfferCtx = createContext<wd_Offer>(undefined as any)

const WeedOffer = ({ offer, view }: { offer: wd_Offer; view?: ViewModes }) => {
  let [atomView, setView] = useAtom(viewAtom)

  view = view || atomView
  return (
    <WeedOfferCtx.Provider value={offer}>
      {view == "v0" ? <V1 /> : <WeedCardDtx />}
    </WeedOfferCtx.Provider>
  )
}

const HeadButtons = () => {
  return (
    <div className="bg-blue-300 p-2">
      <div>
        <HeadButton title="Quick Order" desc="For skilled or introveted users" className="mb-2" />
        <HeadButton title="Take Me To The Human" desc="Wanna talk? Any questions? Press here" />
      </div>
    </div>
  )
}

const HeadButton = ({ title, desc, ...props }) => {
  let { className, ...props2 } = props
  // prettier-ignore
  return (
    <button className={
      clsx(className, `
          group
          m-21 pt-1 pb-1.5
          font-bold
          block w-full
          rounded-md
          bg-gray-200 hover:bg-gray-400
        `)} {...props2}>
      <div className="text-xl font-bold text-gray-800">{title}</div>
      <div className="text-xs text-gray-400 group-hover:text-gray-300">{desc}</div>
    </button>
  )
}

export const Buttons = (props) => {
  let { className, ..._ } = props
  let offer = useContext(WeedOfferCtx)

  let cart = useWeedCart()

  const id = offer.name.length
  const cur = cart.get(id)

  const inc = () => cart.set(offer.name.length, cur + 1)
  const dec = () => cart.set(offer.name.length, Math.max(cur - 1, 0))

  // prettier-ignore
  return (
    // <div className="border-gray-600 cursor-pointer select-none bg-gray-300 sm:flex self-center divide-gray-500 sm:border divide-y sm:divide-y-0 sm:divide-x  sm:mr-8">
    <div className={clsx(className, "flex mx-auto justify-center text-gray-600")}>
      {/* {JSON.stringify({className, props})} */}
      <div className="flex rounded-full elftmr-411 border border-gray-400 bg-gray-100
              divide-y-0 divide-x divide-gray-400
              cursor-pointer select-none">
        <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-400" onClick={inc}>{"  +"}</button>
        <div className="w-10 h-10 flex items-center justify-center hover:bg-gray-400">{cur}</div>
        <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-400" onClick={dec}>-</button>
      </div>
    </div>
  )
}

const PlaceOrder = () => {
  // console.log("routes", Object.keys(Routes))
  const cart = useWeedCart()
  const router = useRouter()
  const [placeOrder, { isLoading }] = useMutation(mtPlaceOrder)

  const doPlaceOrder = async () => {
    let o = await placeOrder({
      items: Object.entries(cart.items).map(([k, q], i) => ({
        id: i,
        name: k,
        q,
      })),
    })
    router.push(Routes.WeedOrderPage({ link: o.link! }))
  }
  return (
    <div>
      <button
        className={clsx("w-full bg-green-400 p-4 text-center", isLoading && "ring-2 ring-blue-400")}
        onClick={doPlaceOrder}
        disabled={isLoading}
      >
        Place Order ({cart.totalG()}g)
      </button>
    </div>
  )
}

function V1() {
  let offer = useContext(WeedOfferCtx)

  return (
    <div className="border1 flex items-center bg-red-100">
      <div className="h-16 w-16 shrink-0 bg-cyan-200 sm:h-24 sm:w-24"></div>
      <div className="grow pl-4 pt-2">
        <div className="text-lg font-black sm:text-2xl ">{offer.name}</div>
        <div className="mt-1 flex gap-3">
          <Plate>{getSativenessText(offer)}</Plate>
          <Plate>THC: {thcCbdText(offer.thc)}</Plate>
          <Plate>CBD: {thcCbdText(offer.cbd)}</Plate>
        </div>
      </div>
      <Buttons />
    </div>
  )
}

function thcCbdText(num: any) {
  if (Number.isNaN(num)) return "-"
  return `${num}%`
}

function ifNaN(v: any, valIfNan: any) {
  return Number.isNaN(v) ? valIfNan : v
}

export function getSativenessText(o: wd_Offer, extra?: { withExtra: true }) {
  let ind = o.indicness || 0
  let sat = o.sativeness || 0

  let text = "HYBRID"
  if (sat > 75) text = "SATIVA"
  if (ind > 75) text = "INDICA"
  if (extra?.withExtra) {
    let shortText = "50/50"
    if (sat > 50) shortText = "S" + Math.round(sat)
    if (ind > 50) shortText = "I" + Math.round(sat)
    text += ` (${shortText})`
  }
  return text
}

WeedTestMenuPage.authenticate = false
// WeedTestMenuPage.getLayout = (page) => <Layout title="eShop">{page}</Layout>

export default WeedTestMenuPage
