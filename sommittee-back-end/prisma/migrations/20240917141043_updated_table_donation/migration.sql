/*
  Warnings:

  - Made the column `address_number` on table `donations` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "donations" ALTER COLUMN "address_number" SET NOT NULL;
