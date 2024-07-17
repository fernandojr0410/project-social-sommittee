/*
  Warnings:

  - You are about to drop the column `amount` on the `receiveds` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "receiveds" DROP COLUMN "amount",
ADD COLUMN     "value" DECIMAL(65,30) NOT NULL DEFAULT 0.00;
