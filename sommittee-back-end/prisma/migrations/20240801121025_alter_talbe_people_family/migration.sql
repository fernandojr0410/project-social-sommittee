/*
  Warnings:

  - The `responsible` column on the `people_family` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "people_family" ADD COLUMN     "work" BOOLEAN,
DROP COLUMN "responsible",
ADD COLUMN     "responsible" TEXT;

-- DropEnum
DROP TYPE "Responsible";
