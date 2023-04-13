-- CreateEnum
CREATE TYPE "wd_Grade" AS ENUM ('TOP', 'EXOTIC', 'MID');

-- CreateTable
CREATE TABLE "wd_Offer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sativeness" DOUBLE PRECISION,
    "indicness" DOUBLE PRECISION,
    "thc" DOUBLE PRECISION,
    "cbd" DOUBLE PRECISION,
    "grade" "wd_Grade",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wd_Offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wd_OfferPrice" (
    "id" SERIAL NOT NULL,
    "offerId" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "wd_OfferPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wd_Order" (
    "id" SERIAL NOT NULL,
    "link" TEXT,
    "userId" INTEGER,
    "totalG" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "comment" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "wd_Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wd_OrderItem" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "offerId" INTEGER NOT NULL,
    "totalG" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "wd_OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "wd_Order_link_key" ON "wd_Order"("link");

-- AddForeignKey
ALTER TABLE "wd_OfferPrice" ADD CONSTRAINT "wd_OfferPrice_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "wd_Offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wd_Order" ADD CONSTRAINT "wd_Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wd_OrderItem" ADD CONSTRAINT "wd_OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "wd_Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wd_OrderItem" ADD CONSTRAINT "wd_OrderItem_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "wd_Offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
