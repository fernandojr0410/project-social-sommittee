/*
  Warnings:

  - Made the column `work` on table `people_family` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "people_family" ALTER COLUMN "work" SET NOT NULL;
