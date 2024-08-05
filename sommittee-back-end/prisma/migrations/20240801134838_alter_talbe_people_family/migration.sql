/*
  Warnings:

  - You are about to drop the column `name_responsible_secundary` on the `people_family` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "people_family" DROP COLUMN "name_responsible_secundary",
ADD COLUMN     "name_responsible_secondary" TEXT;
