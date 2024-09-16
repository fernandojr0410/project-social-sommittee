/*
  Warnings:

  - You are about to drop the column `product_id` on the `stocks` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "stocks" DROP CONSTRAINT "stocks_product_id_fkey";

-- AlterTable
ALTER TABLE "stocks" DROP COLUMN "product_id",
ADD COLUMN     "productId" UUID;

-- AddForeignKey
ALTER TABLE "stocks" ADD CONSTRAINT "stocks_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
