/*
  Warnings:

  - You are about to drop the `OfferProp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PropValue` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PropValue" DROP CONSTRAINT "PropValue_offerId_fkey";

-- DropForeignKey
ALTER TABLE "PropValue" DROP CONSTRAINT "PropValue_propId_fkey";

-- DropTable
DROP TABLE "OfferProp";

-- DropTable
DROP TABLE "PropValue";
