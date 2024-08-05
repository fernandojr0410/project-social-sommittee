/*
  Warnings:

  - Made the column `people_id` on table `families` required. This step will fail if there are existing NULL values in that column.
  - Made the column `people_id` on table `people_family` required. This step will fail if there are existing NULL values in that column.
  - Made the column `function` on table `people_family` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "families" DROP CONSTRAINT "families_people_id_fkey";

-- DropForeignKey
ALTER TABLE "people_family" DROP CONSTRAINT "people_family_people_id_fkey";

-- AlterTable
ALTER TABLE "families" ALTER COLUMN "people_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "people_family" ALTER COLUMN "people_id" SET NOT NULL,
ALTER COLUMN "function" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "families" ADD CONSTRAINT "families_people_id_fkey" FOREIGN KEY ("people_id") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "people_family" ADD CONSTRAINT "people_family_people_id_fkey" FOREIGN KEY ("people_id") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
