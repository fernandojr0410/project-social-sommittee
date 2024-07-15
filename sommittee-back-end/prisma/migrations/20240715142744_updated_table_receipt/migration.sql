/*
  Warnings:

  - You are about to alter the column `value_amount` on the `receipts` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "receipts" ALTER COLUMN "value_amount" SET DATA TYPE INTEGER;
