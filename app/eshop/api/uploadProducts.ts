import { I1CExport, StockDto } from "app/interfaces/I1CExport"
import { BlitzApiRequest, BlitzApiResponse } from "blitz"
import db, { Offer, Prisma, Product, PropCore, Stock } from "db"
import _ from "lodash"
import { uploadCategories } from "./uploadCategories"
import { uploadTags } from "./uploadTags"

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  let body = req.body as I1CExport
  let errorLengthImages = false

  // body = TestUploadProductsBody

  if (!body) return res.status(400).send("Body not found")

  for (const item of body.items!) {
    item.images = _.uniqBy(item.images, "url")

    if (item.images.length > 10) errorLengthImages = true
  }

  if (errorLengthImages)
    return res.json({ error: "Количество картинок в каждом товаре, не должно превышать 10" })

  let stockCache = {} as { [extStockId: string]: Stock }
  let propsCache = {} as { [extStockId: string]: PropCore }

  let stocks = _.chunk(body.stocks, 100)
  let props = _.chunk(body.props, 100)
  let items = _.chunk(body.items, 100)
  let categories = _.chunk(body.categories, 100)

  for (const stock of stocks) {
    await updateStocks(stock, stockCache)
  }

  for (const category of categories) {
    await uploadCategories(category)
  }

  for (const item of items) {
    await updateItems(
      { items: item, stocks: stocks.flat(), props: props.flat(), categories: categories.flat() },
      { stockCache, propsCache }
    )

    await uploadTags(item)
  }

  const offerPropCore = await db.offerPropCore.findMany({})

  res.json({
    offerPropCore,
  })
}

export default handler

export async function updateItems(
  body: I1CExport,
  extra: {
    propsCache: { [extPropId: string]: PropCore }
    stockCache: { [extStockId: string]: Stock }
  }
) {
  let itemCache = {} as { [extProductId: string]: Product }

  if (!body.items) {
    return console.log("No items section found")
  }
  let reqItems = body.items.filter((e) => e.externalId)

  // 1. Loading existing items
  console.log("0. Loading existing items")
  let existing = await db.product.findMany({
    where: {
      externalId: {
        in: reqItems.map((s) => s.externalId),
      },
    },
  })

  let existingImages = await db.image.findMany({
    where: { Product: { externalId: { in: reqItems.map((s) => s.externalId) } } },
  })

  {
    // 2. creating new items
    console.log("2. creating new items")
    let newItems = reqItems.filter(
      (itemInp) => !existing.find((s) => s.externalId == itemInp.externalId)
    )

    await db.product.createMany({
      data: newItems.map(
        (e) =>
          ({
            name: e.name,
            externalId: e.externalId,
            sku: e.sku,
          } as Prisma.ProductCreateManyInput)
      ),
    })
  }

  {
    // 4. updating all
    console.log("4. updating all")
    let dbItems = await db.product.findMany({
      where: {
        externalId: {
          in: reqItems.map((s) => s.externalId!),
        },
      },
      include: { images: true },
    })

    let allItems = await db.$transaction(
      dbItems
        .map((dbItem) => {
          let inpData = reqItems.find((e) => e.externalId == dbItem.externalId)
          if (!inpData) return undefined
          return db.product.update({
            data: {
              name: inpData.name,
              sku: inpData.sku,
              categories: { connect: inpData.categories?.map((item) => ({ externalId: item })) },
            },
            include: { images: true },
            where: {
              id: dbItem.id,
            },
          })
        })
        .filter((e) => e)
        .map((e) => e!)
    )

    // 3. creating new images
    let newImages = reqItems
      .flatMap((item) =>
        item.images.map((image) => ({
          productId: allItems.find((product) => product.externalId === item.externalId)?.id,
          ...image,
        }))
      )
      .filter((image) => !existingImages.find((existingImage) => image.url === existingImage.url))

    await db.image.createMany({
      data: newImages.map((image) => ({ url: image.url, productId: image.productId })),
    })

    for (const product of allItems) {
      itemCache[product.externalId!] = product
    }
  }

  // 3. Updating offers
  console.log("5. Updating offers")
  await updateOffers(body, { ...extra, itemCache })
}

async function updateOffers(
  body: I1CExport,
  extra: {
    propsCache: { [extPropId: string]: PropCore }
    stockCache: { [extStockId: string]: Stock }
    itemCache: { [extProductId: string]: Product }
  }
) {
  let { itemCache } = extra

  if (!body.items) {
    return console.log("No items section found")
  }

  let offers = _.flatten(
    body.items.map((e) =>
      e.offers.map((offer) => ({
        productExtId: e.externalId,
        offer,
      }))
    )
  ).filter((e) => e.offer.id)

  // 0. Loading existing items
  let existing = await db.offer.findMany({
    where: { externalId: { in: offers.map((s) => s.offer.id) } },
  })

  {
    // 1. creating new items
    let newItems = offers.filter(
      (itemInp) => !existing.find((s) => s.externalId == itemInp.offer.id)
    )

    console.log("await db.offer.createMany")
    await db.offer.createMany({
      data: newItems.map(
        (inpOffer) =>
          ({
            name: inpOffer.offer.name,
            externalId: inpOffer.offer.id,
            sku: inpOffer.offer.sku,
            price: inpOffer.offer.price,
            productId: itemCache[inpOffer.productExtId]?.id,
            priceOrig: inpOffer.offer.priceOrig,
            quantity: inpOffer.offer.quantity,
          } as Prisma.OfferCreateManyInput)
      ),
    })
  }

  // 2. updating all
  console.log("await db.offer.findMany")
  let dbOffers = await db.offer.findMany({
    where: {
      externalId: {
        in: offers.map((s) => s.offer.id!),
      },
    },
  })

  console.log("transaction")
  let allOffers = await db.$transaction(
    dbOffers
      .map((dbItem) => {
        let inpOffer = offers!.find((e) => e.offer.id == dbItem.externalId)
        if (!inpOffer) return undefined
        return db.offer.update({
          data: {
            name: inpOffer.offer.name,
            externalId: inpOffer.offer.id,
            sku: inpOffer.offer.sku,
            price: inpOffer.offer.price,
            productId: itemCache[inpOffer.productExtId]?.id,
            priceOrig: inpOffer.offer.priceOrig,
            quantity: inpOffer.offer.quantity || 0,
          } as Prisma.OfferCreateManyInput,
          where: {
            id: dbItem.id,
          },
        })
      })
      .filter((e) => e)
      .map((e) => e!)
  )

  // 3. update stock data
  let offersCache = {} as { [externalId: string]: Offer }
  for (const dbOffer of allOffers) {
    offersCache[dbOffer.externalId!] = dbOffer
  }

  console.log("updateLeftovers")
  await updateLeftovers(body, { ...extra, offersCache })
  console.log("updatePropsValues")
  await updatePropsValues(body, { ...extra, offersCache })
}

async function updatePropsValues(
  body: I1CExport,
  {
    offersCache,
    stockCache,
    propsCache,
  }: {
    propsCache: { [extPropId: string]: PropCore }
    stockCache: { [extStockId: string]: Stock }
    itemCache: { [extProductId: string]: Product }
    offersCache: { [externalId: string]: Offer }
  }
) {
  if (!body.items) {
    return console.log("No items section found")
  }

  const products = await db.product.findMany({})

  let propValuesRaw = _.flatten(
    body.items.map((item) =>
      item.offers.map((offer) =>
        (offer.props || []).map((pv) => ({
          offerId: offersCache[offer.id]?.id!,
          productId: products.find((p) => p.externalId === item.externalId)?.id!,
          name: pv.name,
          valueString: pv.value,
          externalId: pv.id,
          propExternalId: pv.externalId,
          image: item.images?.find((image) => image.props === pv.id),
        }))
      )
    )
  )

  let myPropValues = _.flatten(_.flatten(propValuesRaw))

  console.log("myPropValues", myPropValues)

  // Get All OfferPropCore
  const offersPropsCores = await db.offerPropCore.findMany({
    where: { offerId: { in: myPropValues.map((prop) => prop.offerId) } },
  })

  // New Props
  const newOffersPropsCores = myPropValues.filter(
    (prop) => !offersPropsCores.find((offerProp) => offerProp.offerId === prop.offerId)
  )

  console.log("newOffersPropsCores", newOffersPropsCores)

  const propsCore = _(newOffersPropsCores)
    .map((prop, i, array) => ({
      name: prop.name,
      values: _(array)
        .map((v) => v.name === prop.name && v.valueString)
        .uniq()
        .compact()
        .value(),
      propExternalId: prop.propExternalId,
    }))
    .uniqBy((prop) => prop.name)
    .value()

  console.log(propsCore, "propsCore")

  {
    // Create PropCore
    await db.propCore.createMany({
      data: propsCore.map((prop) => ({
        name: prop.name,
        title: prop.name,
        externalId: prop.propExternalId,
      })),
      skipDuplicates: true,
    })
  }

  const propCore = await db.propCore.findMany({
    where: { externalId: { in: propsCore.map((prop) => prop.propExternalId) } },
  })

  {
    // Create PropValueCore
    await db.propValueCore.createMany({
      data: propsCore.flatMap((prop) =>
        prop.values.map((v) => ({
          name: prop.name,
          value: v?.toString()!,
          propId: propCore.find((p) => p.externalId === prop.propExternalId)?.id!,
        }))
      ),
    })
  }

  {
    // Getting created propValueCore
    const propValueCore = await db.propValueCore.findMany({
      where: { propId: { in: propCore.map((prop) => prop.id) } },
    })

    const images = await db.image.findMany({
      where: { productId: { in: newOffersPropsCores.map((prop) => prop.productId) } },
    })

    const offerPropCore = newOffersPropsCores.map((newProp) => {
      const currentProp = propCore.find((p) => p.externalId === newProp.propExternalId)
      const currentImage = images.find((image) => image.url === newProp.image?.url)
      const relationItem = propValueCore.find(
        (propValue) =>
          propValue.propId === currentProp?.id &&
          propValue.value === newProp.valueString &&
          propValue.name === newProp.name
      )

      if (!relationItem) return undefined

      return {
        offerId: newProp.offerId,
        propId: relationItem.propId,
        valueId: relationItem.id,
        image: currentImage,
      }
    })

    console.log("offerPropCore", offerPropCore)

    // create offerPropCore
    await db.offerPropCore.createMany({
      data: offerPropCore.map((prop) => ({
        offerId: prop?.offerId!,
        propId: prop?.propId!,
        valueId: prop?.valueId!,
      })),
    })

    const offerPropCoreWithImages = offerPropCore.filter((prop) => prop && prop.image)

    console.log(offerPropCoreWithImages, "offerPropCoreWithImages")

    // connect image with propCore, propValueCore, offer
    for (const prop of offerPropCoreWithImages) {
      await db.image.update({
        where: { id: prop?.image!.id },
        data: {
          url: prop?.image?.url,
          propCoreId: prop?.propId,
          propValueCoreId: prop?.valueId,
          offers: { connect: { id: prop?.offerId } },
        },
      })
    }
  }
}

async function updateLeftovers(
  body: I1CExport,
  {
    offersCache,
    stockCache,
  }: {
    stockCache: { [extStockId: string]: Stock }
    propsCache: { [extStockId: string]: PropCore }
    itemCache: { [extProductId: string]: Product }
    offersCache: { [externalId: string]: Offer }
  }
) {
  if (!body.items) {
    return console.log("No items section found")
  }

  let stockValues = _.flatten(
    body.items.map((e) =>
      (e.stocks || []).map(
        (stockValue) =>
          ({
            stockId: stockCache[stockValue.stockId]?.id,
            offerId: offersCache[stockValue.offerId]?.id,
            quantity: stockValue.quantity,
          } as Prisma.StockValueCreateManyInput)
      )
    )
  ).filter((e) => e.stockId && e.offerId)

  let curSV = await db.stockValue.findMany({
    where: {
      offerId: { in: stockValues.map((sv) => sv.offerId) },
      stockId: { in: stockValues.map((sv) => sv.stockId) },
    },
  })
  curSV = curSV.filter((e) =>
    stockValues.find((inp) => e.offerId == inp.offerId && e.stockId == inp.stockId)
  )
  await db.stockValue.deleteMany({
    where: {
      id: { in: curSV.map((e) => e.id) },
    },
  })
  await db.stockValue.createMany({
    data: stockValues,
  })
  // console.log("stock values", r)
  console.log("st", await db.stockValue.findMany())
}

export async function updateStocks(
  stocks: StockDto[],
  stockCache: { [extStockId: string]: Stock }
) {
  if (stocks) {
    let existing = await db.stock.findMany({
      where: {
        externalId: {
          in: stocks.map((s) => s.id),
        },
      },
    })

    let newStocks = stocks.filter((stockInp) => !existing.find((s) => s.externalId != stockInp.id))
    let toUpdate = stocks.filter((stockInp) => existing.find((s) => s.externalId != stockInp.id))

    for (const newStock of newStocks) {
      stockCache[newStock.id] = await db.stock.create({
        data: {
          name: newStock.name,
          externalId: newStock.id,
        },
      })
    }

    for (const stock of toUpdate) {
      let toUpdate = existing.find((s) => s.externalId == stock.id)!
      stockCache[stock.id] = await db.stock.update({
        data: {
          name: stock.name,
        },
        where: {
          id: toUpdate.id,
        },
      })
    }
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "500mb",
    },
  },
}
