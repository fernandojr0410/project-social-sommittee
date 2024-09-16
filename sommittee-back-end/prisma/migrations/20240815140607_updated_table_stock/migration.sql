/*
  Warnings:

  - The `amount` column on the `stocks` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "stocks" DROP COLUMN "amount",
ADD COLUMN     "amount" INTEGER;
