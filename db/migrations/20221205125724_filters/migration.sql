-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "propCoreId" INTEGER,
ADD COLUMN     "propValueId" INTEGER;

-- AlterTable
ALTER TABLE "PropCore" ADD COLUMN     "categoryId" INTEGER;


-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_propCoreId_fkey" FOREIGN KEY ("propCoreId") REFERENCES "PropCore"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_propValueId_fkey" FOREIGN KEY ("propValueId") REFERENCES "PropValueCore"("id") ON DELETE SET NULL ON UPDATE CASCADE;
