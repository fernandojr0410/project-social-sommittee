/*
  Warnings:

  - Made the column `state` on table `donations` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "donations" ALTER COLUMN "state" SET NOT NULL,
ALTER COLUMN "state" SET DATA TYPE TEXT;

-- DropEnum
DROP TYPE "State";
