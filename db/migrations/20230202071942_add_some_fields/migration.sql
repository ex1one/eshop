/*
  Warnings:

  - You are about to drop the column `propValueId` on the `Image` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_propValueId_fkey";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "propValueId";

-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "imageId" INTEGER;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
