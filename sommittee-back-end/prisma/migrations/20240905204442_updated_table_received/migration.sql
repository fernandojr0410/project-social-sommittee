/*
  Warnings:

  - You are about to drop the column `value` on the `receiveds` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "receiveds" DROP COLUMN "value",
ADD COLUMN     "amount" DECIMAL(65,30) NOT NULL DEFAULT 0;
