/*
  Warnings:

  - You are about to drop the column `function_Broher` on the `people_family` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "people_family" DROP COLUMN "function_Broher",
ADD COLUMN     "function_Brother" TEXT;
