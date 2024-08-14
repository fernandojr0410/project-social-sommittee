/*
  Warnings:

  - You are about to drop the column `date` on the `donations` table. All the data in the column will be lost.
  - Added the required column `date_delivery` to the `donations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "donations" DROP COLUMN "date",
ADD COLUMN     "date_delivery" TEXT NOT NULL;
