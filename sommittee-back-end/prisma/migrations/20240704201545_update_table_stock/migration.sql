/*
  Warnings:

  - Added the required column `donation_id` to the `stocks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stocks" ADD COLUMN     "donation_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "stocks" ADD CONSTRAINT "stocks_donation_id_fkey" FOREIGN KEY ("donation_id") REFERENCES "donations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
