export type TWeedOffer = {
  name: string
  sativeness: number
  indicness: number
  thc: number
  cbd?: number
  prices: {
    w: number
    p: number
  }[]
  grade?: "TOP" | "EXOTIC" | "MID"
  flavours?: string[]
  effects?: string[]
  img?: string
}
const WEED_OFFERS: TWeedOffer[] = [
  {
    name: "Gelato - 41",
    sativeness: 45,
    indicness: 55,
    thc: 20,
    cbd: 1,
    prices: [
      { w: 1, p: 700 },
      { w: 3, p: 1750 },
      { w: 5, p: 2750 },
    ],
    grade: "TOP",
    flavours: ["mint", "pepper", "cheese"],
    effects: ["relax", "sleep"],
    img: "https://b2c-contenthub.com/images/test-dud-1.png",
  },
  {
    name: "LSD",
    sativeness: 25,
    indicness: 75,
    thc: 20,
    cbd: 3,
    prices: [
      { w: 1, p: 600 },
      { w: 3, p: 1500 },
      { w: 5, p: 2400 },
    ],
    grade: "TOP",
  },
  {
    name: "OG Kush",
    sativeness: 45,
    indicness: 55,
    thc: 19,
    cbd: 1,
    prices: [
      { w: 1, p: 600 },
      { w: 3, p: 1500 },
      { w: 5, p: 2400 },
    ],
    grade: "TOP",
  },
  {
    name: "Bruce Banner",
    sativeness: 60,
    indicness: 40,
    thc: 21,
    cbd: 1,
    prices: [
      { w: 1, p: 700 },
      { w: 3, p: 1750 },
      { w: 5, p: 2750 },
    ],
    grade: "TOP",
  },
  {
    name: "Sugar Cane",
    sativeness: 50,
    indicness: 50,
    thc: 20,
    cbd: 0,
    prices: [
      { w: 1, p: NaN },
      { w: 3, p: NaN },
      { w: 5, p: NaN },
    ],
    grade: "TOP",
  },
  // {
  //   name: "Blue Moonrocks",
  //   sativeness: 35,
  //   indicness: 65,
  //   thc: NaN,
  //   cbd: 2,
  //   prices: [
  //     { w: 1, p: NaN },
  //     { w: 3, p: NaN },
  //     { w: 5, p: NaN },
  //   ],
  //   grade: "TOP",
  // },
  // {
  //   name: "Cressendo",
  //   sativeness: 30,
  //   indicness: 70,
  //   thc: 25,
  //   cbd: 1,
  //   prices: [
  //     { w: 1, p: NaN },
  //     { w: 3, p: NaN },
  //     { w: 5, p: NaN },
  //   ],
  //   grade: "TOP",
  // },
  // {
  //   name: "Pinapple OG",
  //   sativeness: 40,
  //   indicness: 60,
  //   thc: 22,
  //   cbd: 0,
  //   prices: [
  //     { w: 1, p: NaN },
  //     { w: 3, p: NaN },
  //     { w: 5, p: NaN },
  //   ],
  //   grade: "TOP",
  // },
  // {
  //   name: "Gelato - 41",
  //   sativeness: 45,
  //   indicness: 55,
  //   thc: 20,
  //   cbd: 1,
  //   prices: [
  //     { w: 1, p: 700 },
  //     { w: 3, p: 1750 },
  //     { w: 5, p: 2750 },
  //   ],
  // },
  // {
  //   name: "Gelato - 41",
  //   sativeness: 45,
  //   indicness: 55,
  //   thc: 20,
  //   cbd: 1,
  //   prices: [
  //     { w: 1, p: 700 },
  //     { w: 3, p: 1750 },
  //     { w: 5, p: 2750 },
  //   ],
  // },
  // {
  //   name: "Gelato - 41",
  //   sativeness: 45,
  //   indicness: 55,
  //   thc: 20,
  //   cbd: 1,
  //   prices: [
  //     { w: 1, p: 700 },
  //     { w: 3, p: 1750 },
  //     { w: 5, p: 2750 },
  //   ],
  // },
  // {
  //   name: "Crehasd",
  //   sativeness: 100,
  //   indicness: 0,
  //   thc: 20,
  //   cbd: 1,
  //   prices: [
  //     { w: 1, p: 700 },
  //     { w: 3, p: 1750 },
  //     { w: 5, p: 2750 },
  //   ],
  // },
  // {
  //   name: "Crehasd 123",
  //   sativeness: 100,
  //   indicness: 0,
  //   thc: 20,
  //   cbd: 1,
  //   prices: [
  //     { w: 1, p: 700 },
  //     { w: 3, p: 1750 },
  //     { w: 5, p: 2750 },
  //   ],
  // },
]

export { WEED_OFFERS }
