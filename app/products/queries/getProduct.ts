import { NotFoundError } from "blitz"
import db from "db"

interface GetProductProps {
  id: number
}

export default async function getProduct({ id }: GetProductProps) {
  const product = await db.product.findFirst({
    where: { id },
    include: {
      images: true,
      categories: {
        include: { products: { include: { images: true, offers: { include: { image: true } } } } },
      },
      offers: {
        include: {
          image: true,
          stocks: { include: { stock: true } },
          product: {
            include: {
              categories: {
                include: { successors: true },
              },
            },
          },
          propsCore: {
            include: {
              prop: {
                include: {
                  values: {
                    include: { images: true },
                    where: { offersProps: { some: { offer: { productId: id } } } },
                  },
                },
              },
              value: true,
              offer: true,
            },
          },
        },
      },
    },
  })

  if (!product) throw new NotFoundError()

  // TODO: Сюда добавить сушность Tag и по нему фильтровать товары
  // const similarProducts = await db.product.findMany({
  //   where: { name: { search: `${product.name}` } },
  //   include: { images: true, offers: { include: { image: true } } },
  //   take: 8,
  // })

  return { product }
}
