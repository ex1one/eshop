//@ts-nocheck
import { BlitzApiRequest, BlitzApiResponse } from "blitz"
import _ from "lodash"

const colors = [
  {
    id: "color-black",
    externalId: "colors",
    name: "Цвет",
    value: "Черный",
  },
  {
    id: "color-red",
    externalId: "colors",
    name: "Цвет",
    value: "Красный",
  },
  {
    id: "color-yellow",
    externalId: "colors",
    name: "Цвет",
    value: "Жёлтый",
  },
  {
    id: "color-green",
    externalId: "colors",
    name: "Цвет",
    value: "Зелёный",
  },
  {
    id: "color-orange",
    externalId: "colors",
    name: "Цвет",
    value: "Оранжевый",
  },
  {
    id: "color-pink",
    externalId: "colors",
    name: "Цвет",
    value: "Розовый",
  },
  {
    id: "color-white",
    externalId: "colors",
    name: "Цвет",
    value: "Белый",
  },
  {
    id: "color-blue",
    externalId: "colors",
    name: "Цвет",
    value: "Голубой",
  },
  {
    id: "color-dark-blue",
    externalId: "colors",
    name: "Цвет",
    value: "Тёмно-синий",
  },
  {
    id: "color-gray",
    externalId: "colors",
    name: "Цвет",
    value: "Серый",
  },
  {
    id: "color-purple",
    externalId: "colors",
    name: "Цвет",
    value: "Фиолетовый",
  },
  {
    id: "color-lavander",
    externalId: "colors",
    name: "Цвет",
    value: "Лавандовый",
  },
]

const sizes = [
  {
    id: "size-xl",
    externalId: "sizes",
    name: "Размер",
    value: "XL",
  },
  {
    id: "size-xxl",
    externalId: "sizes",
    name: "Размер",
    value: "XXL",
  },
  {
    id: "size-4xl",
    externalId: "sizes",
    name: "Размер",
    value: "4XL",
  },
  {
    id: "size-4xl",
    externalId: "sizes",
    name: "Размер",
    value: "4XL",
  },
  {
    id: "size-l",
    externalId: "sizes",
    name: "Размер",
    value: "L",
  },
  {
    id: "size-m",
    externalId: "sizes",
    name: "Размер",
    value: "M",
  },
  {
    id: "size-s",
    externalId: "sizes",
    name: "Размер",
    value: "S",
  },
]

const stuffs = [
  {
    id: "stuff-silk",
    externalId: "stuff",
    name: "Материал",
    value: "Шёлк",
  },
  {
    id: "stuff-cotton",
    externalId: "stuff",
    name: "Материал",
    value: "Xлопок",
  },
  {
    id: "stuff-artificial-leather",
    externalId: "stuff",
    name: "Материал",
    value: "Искусственная кожа",
  },
  {
    id: "stuff-spandex",
    externalId: "stuff",
    name: "Материал",
    value: "Спандекс",
  },
  {
    id: "stuff-fur",
    externalId: "stuff",
    name: "Материал",
    value: "Мех",
  },
]

const categories = [
  { id: "smartphones", parentId: "smartphones" },
  { id: "laptops", parentId: "laptops" },
  { id: "fragrances", parentId: "fragrances" },
  { id: "skincare", parentId: "skincare" },
  { id: "home-decoration", parentId: "home-decoration" },
  { id: "womens-dresses", parentId: "woman's clothing" },
  { id: "womens-shoes", parentId: "woman's clothing" },
  { id: "skinmens-shirtscare", parentId: "men's clothing" },
  { id: "mens-shoes", parentId: "men's clothing" },
  { id: "mens-watches", parentId: "watches" },
  { id: "womens-watches", parentId: "watches" },
  { id: "womens-bags", parentId: "woman's clothing" },
  { id: "sunglasses", parentId: "sunglasses" },
  { id: "womens-jewellery", parentId: "jewellery" },
  { id: "lighting", parentId: "lighting" },
  { id: "automotive", parentId: "automotive" },
]

const ourCategories = [
  {
    name: "Женские платья",
    id: "womens-dresses",
    parentId: "woman's clothing",
  },
  {
    name: "Женские портфели",
    id: "womens-bags",
    parentId: "woman's clothing",
  },
  {
    name: "Мужские туфли",
    id: "mens-shoes",
    parentId: "men's clothing",
  },
  {
    name: "Женские туфли",
    id: "womens-shoes",
    parentId: "woman's clothing",
  },
  {
    name: "Мужские часы",
    id: "mens-watches",
    parentId: "watches",
  },
  {
    name: "Женские часы",
    id: "womens-watches",
    parentId: "watches",
  },
  {
    name: "Ароматы",
    id: "fragrances",
  },
  {
    name: "Уход за кожей",
    id: "skincare",
  },
  {
    name: "Домашние украшения",
    id: "home-decoration",
  },
  {
    name: "Очки",
    id: "sunglasses",
  },
  {
    name: "Часы",
    id: "watches",
  },
  {
    name: "Мужская одежда",
    id: "men's clothing",
  },
  {
    name: "Женская одежда",
    id: "woman's clothing",
  },
  {
    name: "Мобильные телефоны",
    id: "smartphones",
  },
  {
    name: "Ноутбуки",
    id: "laptops",
  },
  {
    name: "Освещение",
    id: "lighting",
  },
  {
    name: "Украшения",
    id: "jewellery",
  },
  {
    name: "Украшения для женщин",
    id: "womens-jewellery",
    parentId: "jewellery",
  },
  {
    name: "Для автомобилей",
    id: "automotive",
  },
]

export const formattedTitle = (title: string) => {
  return title.toLowerCase().replace(/[^A-Za-z]+/g, "")
}

export function getRandomArbitrary(min, max) {
  return Math.ceil(Math.random() * (max - min) + min)
}

export function getOriginalPrice(price: number, percent: number) {
  return (price / 100) * percent
}

export function getPropsForOffer(selectedColor: string | undefined) {
  const propColor = colors.find((c) => c.id == selectedColor)
  const propSize = sizes[getRandomArbitrary(0, sizes.length)]
  const propStuff = stuffs[getRandomArbitrary(0, stuffs.length)]

  return [propColor, propSize, propStuff]
}

export function generateOffersAndImages(images: Array<string>, countOffers: number, name: string) {
  const newImages = _(images)
    .map((image) => ({
      url: image,
      props: colors[getRandomArbitrary(0, colors.length)]?.id,
    }))
    .uniqBy("props")
    .value()

  const offers = []

  for (let i = 1; i < countOffers + 1; i++) {
    const randomPercent = getRandomArbitrary(0, 100)
    const price = getRandomArbitrary(0, 10000)
    const props = getPropsForOffer(
      newImages[getRandomArbitrary(0, newImages.length)]?.props
    ).filter((p) => p)

    const offer = {
      name: `${name} ${props.map((p) => p?.value).join(" ")}`,
      price,
      quantity: getRandomArbitrary(0, 100),
      id: `${_.random(0, 100000)}`,
      origPrice: getOriginalPrice(price, randomPercent),
      props,
    }

    offers.push(offer)
  }

  return { offers, images: newImages }
}

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const ourProducts = []

  for (let i = 0; i < categories.length; i++) {
    await fetch(`https://dummyjson.com/products/category/${categories[i]?.id}?limit=3`)
      .then((res) => res.json())
      .then((response) => ourProducts.push(response.products))
  }

  const newProducts = ourProducts.flat().map((p) => {
    const { offers, images } = generateOffersAndImages(p.images, getRandomArbitrary(0, 5), p.title)

    return {
      name: p.title,
      price: p.price,
      stock: p.stock,
      sku: `${p.id}`,
      externalId: `${p.id}`,
      categories: [ourCategories.find((c) => c.id === p.category)?.id],
      brand: p.brand,
      description: p.description,
      offers,
      images,
      tags: [p.brand, p.title],
    }
  })

  const brands = newProducts.flat().map((p) => ({
    id: formattedTitle(`${p.brand}`),
    externalId: "brands",
    name: "Брэнд",
    value: `${p.brand}`,
  })) // Для фильтрации по брэндам, у тех кого они есть

  res.json({
    items: newProducts,
  })
}

export default handler
