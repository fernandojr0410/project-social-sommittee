/*
  Warnings:

  - You are about to drop the column `contact` on the `donors` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `donors` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `people` table. All the data in the column will be lost.
  - You are about to drop the column `stock_id` on the `received_products` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[identifier]` on the table `donors` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[identifier]` on the table `people` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_id` to the `received_products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "received_products" DROP CONSTRAINT "received_products_stock_id_fkey";

-- DropIndex
DROP INDEX "donors_cpf_key";

-- DropIndex
DROP INDEX "people_cpf_key";

-- AlterTable
ALTER TABLE "donors" DROP COLUMN "contact",
DROP COLUMN "cpf",
ADD COLUMN     "identifier" CHAR(14),
ADD COLUMN     "telephone" CHAR(15);

-- AlterTable
ALTER TABLE "people" DROP COLUMN "cpf",
ADD COLUMN     "identifier" CHAR(14);

-- AlterTable
ALTER TABLE "received_products" DROP COLUMN "stock_id",
ADD COLUMN     "product_id" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "donors_identifier_key" ON "donors"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "people_identifier_key" ON "people"("identifier");

-- AddForeignKey
ALTER TABLE "received_products" ADD CONSTRAINT "received_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
