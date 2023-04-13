/*
  Warnings:

  - A unique constraint covering the columns `[externalId]` on the table `PropCore` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `externalId` to the `PropCore` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "propValueCoreId" INTEGER;

-- AlterTable
ALTER TABLE "PropCore" ADD COLUMN     "externalId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PropCore_externalId_key" ON "PropCore"("externalId");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_propValueCoreId_fkey" FOREIGN KEY ("propValueCoreId") REFERENCES "PropValueCore"("id") ON DELETE SET NULL ON UPDATE CASCADE;
