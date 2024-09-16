/*
  Warnings:

  - Made the column `amount` on table `stocks` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "stocks" ALTER COLUMN "amount" SET NOT NULL;
