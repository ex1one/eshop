/*
  Warnings:

  - You are about to drop the column `value` on the `PropValueCore` table. All the data in the column will be lost.
  - Added the required column `value2` to the `PropValueCore` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PropValueCore"
-- //DROP COLUMN "value",
ADD COLUMN     "value2" TEXT NOT NULL;
