/*
  Warnings:

  - You are about to drop the column `user_id` on the `donations` table. All the data in the column will be lost.
  - You are about to drop the column `donation_id` on the `stocks` table. All the data in the column will be lost.
  - Added the required column `product_id` to the `donations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock_id` to the `donations` table without a default value. This is not possible if the table is not empty.
  - Made the column `donor_id` on table `donations` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "donations" DROP CONSTRAINT "donations_donor_id_fkey";

-- DropForeignKey
ALTER TABLE "donations" DROP CONSTRAINT "donations_user_id_fkey";

-- DropForeignKey
ALTER TABLE "stocks" DROP CONSTRAINT "stocks_donation_id_fkey";

-- AlterTable
ALTER TABLE "donations" DROP COLUMN "user_id",
ADD COLUMN     "product_id" UUID NOT NULL,
ADD COLUMN     "stock_id" UUID NOT NULL,
ADD COLUMN     "userId" UUID,
ALTER COLUMN "donor_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "stocks" DROP COLUMN "donation_id";

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_donor_id_fkey" FOREIGN KEY ("donor_id") REFERENCES "donors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_stock_id_fkey" FOREIGN KEY ("stock_id") REFERENCES "stocks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
