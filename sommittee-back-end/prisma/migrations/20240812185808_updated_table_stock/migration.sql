-- DropForeignKey
ALTER TABLE "stocks" DROP CONSTRAINT "stocks_donation_id_fkey";

-- AlterTable
ALTER TABLE "stocks" ALTER COLUMN "donation_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "stocks" ADD CONSTRAINT "stocks_donation_id_fkey" FOREIGN KEY ("donation_id") REFERENCES "donations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
