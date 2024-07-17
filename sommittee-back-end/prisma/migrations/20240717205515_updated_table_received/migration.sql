/*
  Warnings:

  - Made the column `value` on table `receiveds` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "receiveds" ALTER COLUMN "value" SET NOT NULL;
