/*
  Warnings:

  - Made the column `family_id` on table `donations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `people_id` on table `donations` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "donations" DROP CONSTRAINT "donations_family_id_fkey";

-- DropForeignKey
ALTER TABLE "donations" DROP CONSTRAINT "donations_people_id_fkey";

-- AlterTable
ALTER TABLE "donations" ALTER COLUMN "family_id" SET NOT NULL,
ALTER COLUMN "people_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_people_id_fkey" FOREIGN KEY ("people_id") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_family_id_fkey" FOREIGN KEY ("family_id") REFERENCES "families"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
