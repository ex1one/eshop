import clsx from "clsx"
import _ from "lodash"
import { useContext } from "react"
import { WeedOfferCtx, getSativenessText, Buttons } from "./pages/index"

export function WeedCardDtx() {
  let offer = useContext(WeedOfferCtx)

  let outlineClr = _.sample(_.uniq(["outline-blue-400", "outline-gray-400", "outline-gray-400", "outline-gray-400", "outline-gray-400", "outline-green-400", "outline-slate-400", "outline-gray-400", "outline-zinc-400", "outline-neutral-400", "outline-stone-400", "outline-red-400", "outline-orange-400", "outline-amber-400", "outline-yellow-400", "outline-lime-400", "outline-green-400", "outline-emerald-400", "outline-teal-400", "outline-cyan-400", "outline-sky-400", "outline-blue-400", "outline-indigo-400", "outline-violet-400", "outline-purple-400", "outline-fuchsia-400", "outline-pink-400", "outline-rose-400"])) // prettier-ignore
  // let bgClr = _.sample(["bg-blue-400", "bg-gray-400", "bg-gray-400", "bg-gray-400", "bg-gray-400", "bg-green-400", "bg-slate-400", "bg-gray-400", "bg-zinc-400", "bg-neutral-400", "bg-stone-400", "bg-red-400", "bg-orange-400", "bg-amber-400", "bg-yellow-400", "bg-lime-400", "bg-green-400", "bg-emerald-400", "bg-teal-400", "bg-cyan-400", "bg-sky-400", "bg-blue-400", "bg-indigo-400", "bg-violet-400", "bg-purple-400", "bg-fuchsia-400", "bg-pink-400", "bg-rose-400"]) // prettier-ignore
  // let bgClr = _.sample(["bg-blue-200", "bg-gray-200", "bg-gray-200", "bg-gray-200", "bg-gray-200", "bg-green-200", "bg-slate-200", "bg-gray-200", "bg-zinc-200", "bg-neutral-200", "bg-stone-200", "bg-red-200", "bg-orange-200", "bg-amber-200", "bg-yellow-200", "bg-lime-200", "bg-green-200", "bg-emerald-200", "bg-teal-200", "bg-cyan-200", "bg-sky-200", "bg-blue-200", "bg-indigo-200", "bg-violet-200", "bg-purple-200", "bg-fuchsia-200", "bg-pink-200", "bg-rose-200"]) // prettier-ignore
  // let bgClr = _.sample(["bg-blue-50", "bg-gray-50", "bg-gray-50", "bg-gray-50", "bg-gray-50", "bg-green-50", "bg-slate-50", "bg-gray-50", "bg-zinc-50", "bg-neutral-50", "bg-stone-50", "bg-red-50", "bg-orange-50", "bg-amber-50", "bg-yellow-50", "bg-lime-50", "bg-green-50", "bg-emerald-50", "bg-teal-50", "bg-cyan-50", "bg-sky-50", "bg-blue-50", "bg-indigo-50", "bg-violet-50", "bg-purple-50", "bg-fuchsia-50", "bg-pink-50", "bg-rose-50"]) // prettier-ignore
  let bgClr = _.sample(["bg-blue-100", "bg-gray-100", "bg-gray-100", "bg-gray-100", "bg-gray-100", "bg-green-100", "bg-slate-100", "bg-gray-100", "bg-zinc-100", "bg-neutral-100", "bg-stone-100", "bg-red-100", "bg-orange-100", "bg-amber-100", "bg-yellow-100", "bg-lime-100", "bg-green-100", "bg-emerald-100", "bg-teal-100", "bg-cyan-100", "bg-sky-100", "bg-blue-100", "bg-indigo-100", "bg-violet-100", "bg-purple-100", "bg-fuchsia-100", "bg-pink-100", "bg-rose-100"]) // prettier-ignore
  bgClr = outlineClr?.replace("400", "100").replace("outline", "bg")
  return (
    <div className="wc weed-card border1 rounded-xl bg-white pt-2 shadow-xl">
      <div className="border-red-8010  flex h-60 w-full items-center justify-center ">
        {/* 🖼  prettier-ignore */}
        <div
          className={clsx(
            "wc-img h-44 aspect-square rounded-full",
            "outline-red-4010 outline outline-8",
            "flex items-center",
            outlineClr,
            bgClr
          )}
        >
          {offer.img && <img className="w-full mix-blend-darken	" src={offer.img} />}
        </div>
      </div>
      <div className="wc_caption-block border1 flex justify-center border-black">
        <div className="border-red-6001 border1 flex flex-col">
          <div className="wc_secondary-text ml-41 text-center italic">{getLab()}</div>
          {/* <div className="wc_caption text-center1 flex justify-center border-b border-black px-2 font-serif text-2xl font-black capitalize">
            {offer.name.toUpperCase()}
          </div> */}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="wc_caption text-center1 mx-auto flex justify-center border-b border-black px-2 font-serif text-2xl font-black capitalize">
          {offer.name.toUpperCase()}
        </div>
      </div>
      <div className="wc_extra-info mt-3  text-center">
        <div className="text-lgs mb-2 font-bold">
          <div>{getSativenessText(offer, { withExtra: true })}</div>
          <div>THC {offer.thc}%</div>
        </div>
        <div className="space-y-0.5 text-xs font-bold">
          <div>FLAVOUR: {offer.flavours || getFlavours().join(", ")}</div>
          <div>EFFECTS: {offer.effects || getEffects().join(", ")}</div>
        </div>
      </div>
      <Buttons className="mt-4 mb-6" />
    </div>
  )
}

function getLab() {
  return _.sample(["seed city", "mellow lab", "mellow station"])
}

function getFlavours() {
  let ttl = _.random(2, 2)
  let all = ["pepper", "mint", "orange", "fruity", "species", "cake", "catpee"]
  all.sort(() => Math.random() - 0.5)

  let res = [] as string[]
  while (ttl--) res.push(all[res.length]!.toUpperCase())

  return res
}

function getEffects() {
  let ttl = _.random(2, 4)
  let all = ["relax", "hungry", "stress", "stone", "sleep", "energy", "focus", "horny"]
  all.sort(() => Math.random() - 0.5)

  let res = [] as string[]
  while (ttl--) res.push(all[res.length]!.toUpperCase())

  return res
}
