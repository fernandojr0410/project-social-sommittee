/*
  Warnings:

  - You are about to alter the column `cpf` on the `people` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Char(14)`.
  - Made the column `cpf` on table `people` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `people` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "people" ALTER COLUMN "cpf" DROP DEFAULT;
ALTER TABLE "people" ALTER COLUMN "email" DROP DEFAULT;
ALTER TABLE "people" ALTER COLUMN "cpf" SET NOT NULL;
ALTER TABLE "people" ALTER COLUMN "email" SET NOT NULL;
