/*
  Warnings:

  - You are about to alter the column `cpf` on the `people` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Char(14)`.

*/
-- AlterTable
ALTER TABLE "people" ALTER COLUMN "cpf" SET DATA TYPE CHAR(14),
ALTER COLUMN "email" SET DATA TYPE TEXT;
