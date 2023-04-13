/*
  Warnings:

  - Added the required column `externalId` to the `PropValue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `externalId` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PropValue" ADD COLUMN     "externalId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Stock" ADD COLUMN     "externalId" TEXT NOT NULL;
