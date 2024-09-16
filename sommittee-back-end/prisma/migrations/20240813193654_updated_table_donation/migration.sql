/*
  Warnings:

  - Made the column `donor_id` on table `donations` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "donations" DROP CONSTRAINT "donations_donor_id_fkey";

-- AlterTable
ALTER TABLE "donations" ALTER COLUMN "donor_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_donor_id_fkey" FOREIGN KEY ("donor_id") REFERENCES "donors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
