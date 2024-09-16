/*
  Warnings:

  - Made the column `date` on table `donations` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "donations" ALTER COLUMN "date" SET NOT NULL;
