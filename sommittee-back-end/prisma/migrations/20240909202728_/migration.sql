/*
  Warnings:

  - Made the column `identifier` on table `donors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telephone` on table `donors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `identifier` on table `people` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "donors" ALTER COLUMN "identifier" SET NOT NULL,
ALTER COLUMN "telephone" SET NOT NULL;

-- AlterTable
ALTER TABLE "people" ALTER COLUMN "identifier" SET NOT NULL;
