export interface I1CExport {
  categories?: CategoryDto[]
  items?: ItemDto[]
  props?: PropDto[]
  stocks?: StockDto[]
}
export interface CategoryDto {
  name: string
  id: string
  parentId?: string
}
export interface ItemDto {
  externalId: string
  name: string
  sku: string
  tags: string[]
  categories?: string[]
  offers: OfferDto[]
  images: ImageDto[]
  stocks: StockEntityDto[]
}
export interface ImageDto {
  url: string
  props: string
}
export interface StockEntityDto {
  stockId: string
  offerId: string
  quantity: number
}
export interface StockDto {
  id: string
  name: string
}
export interface OfferDto {
  id: string
  name: string
  sku?: string
  price: number
  priceOrig?: number
  quantity?: number
  props?: PropValue[]
}
export interface PropDto {
  id: string
  name: string
  type?: string
}
export interface PropValue {
  id: string
  value: string | number | Date
  name: string
  externalId: string
}
