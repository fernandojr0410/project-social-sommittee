/*
  Warnings:

  - You are about to drop the column `productId` on the `stocks` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "stocks" DROP CONSTRAINT "stocks_productId_fkey";

-- AlterTable
ALTER TABLE "stocks" DROP COLUMN "productId";
