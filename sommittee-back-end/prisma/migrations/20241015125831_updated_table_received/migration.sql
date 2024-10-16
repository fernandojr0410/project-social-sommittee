/*
  Warnings:

  - Made the column `date` on table `receiveds` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "receiveds" ALTER COLUMN "date" SET NOT NULL,
ALTER COLUMN "date" DROP DEFAULT,
ALTER COLUMN "date" SET DATA TYPE TEXT;
