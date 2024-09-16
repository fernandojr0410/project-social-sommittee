/*
  Warnings:

  - Made the column `number` on table `address` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "address" ALTER COLUMN "complement" DROP NOT NULL,
ALTER COLUMN "number" SET NOT NULL;
