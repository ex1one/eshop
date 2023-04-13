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

const Max228Page: BlitzPage = ({}: HomePageProps) => {
  let a = "asd"
  return (
    <div className="grid grid-cols-2">
      <OrderDetails />
      <TG />
      <div>
        <div className="pl-20">TELEGRAM</div>
        <img className="w-80 h-88" src="https://i.imgur.com/VsiN3Cx.jpg" />
      </div>
      <div>
        <div className="pl-28">LINE</div>
        <img className="w-240 h-240" src="https://i.imgur.com/iQv11xq.jpg" />
      </div>
      <div>
        <div className="pl-20">WeChat</div>
        <img className="w-240 h-240" src="https://i.imgur.com/8dGf4JX.jpg" />
      </div>
    </div>
  )
}

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    if (file) {
      setSelectedImage(file)
      // onImageSelect(file)
    }
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileSelect} />
      {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="Selected" />}
    </div>
  )
}

function OrderDetails() {
  let [address, setAddress] = useState("")
  let [time, setTime] = useState("asap")
  return (
    <div>
      <div className="border border-red-500 rounded">
        <div>Address:</div>
        <div>
          <input className="border" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
      </div>
      <div className="border border-red-500 rounded">
        <div>Which time?:</div>
        <div>
          <input className="border" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
      </div>
      <div>{address}</div>
      <ImageUploader />
      <button className="bg-indigo-200 px-2 rounded py-1" onClick={() => alert(address)}>
        Yo
      </button>
    </div>
  )
}
function TG() {
  return (
    <div>
      <div className="pl-20">WHATSAPP</div>
      <img className="w-240 h-240" src="https://i.imgur.com/flkqH8N.jpg" />
    </div>
  )
}

function Compo({ initialValue = 66, dddd = 1 }) {
  let [count, setCount] = useState(initialValue)

  return (
    <div onClick={() => setCount(count + dddd)} className="jh border-2 border-red-600 rounded-lg">
      {initialValue}
      <br />
      {count}
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

Max228Page.authenticate = false

export default Max228Page
