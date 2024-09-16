/*
  Warnings:

  - You are about to drop the column `product_id` on the `donations` table. All the data in the column will be lost.
  - You are about to drop the column `value_amount` on the `purchases` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "donations" DROP CONSTRAINT "donations_product_id_fkey";

-- AlterTable
ALTER TABLE "donations" DROP COLUMN "product_id";

-- AlterTable
ALTER TABLE "purchases" DROP COLUMN "value_amount",
ADD COLUMN     "amount" DECIMAL(65,30) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "stocks" ALTER COLUMN "amount" SET DEFAULT 0,
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(65,30);

-- CreateTable
CREATE TABLE "donation_products" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "product_id" UUID NOT NULL,
    "donation_id" UUID NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL DEFAULT 0,

    CONSTRAINT "donation_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DonationToProduct" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DonationToProduct_AB_unique" ON "_DonationToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_DonationToProduct_B_index" ON "_DonationToProduct"("B");

-- AddForeignKey
ALTER TABLE "donation_products" ADD CONSTRAINT "donation_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donation_products" ADD CONSTRAINT "donation_products_donation_id_fkey" FOREIGN KEY ("donation_id") REFERENCES "donations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DonationToProduct" ADD CONSTRAINT "_DonationToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "donations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DonationToProduct" ADD CONSTRAINT "_DonationToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
