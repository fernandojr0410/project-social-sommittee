/*
  Warnings:

  - You are about to drop the column `function` on the `people_family` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Responsible" AS ENUM ('MOTHER', 'FATHER', 'UNCLE', 'AUNT', 'GRANDMOTHER', 'GRANDFATHER', 'SISTER', 'BROTHER');

-- AlterTable
ALTER TABLE "people_family" DROP COLUMN "function",
ADD COLUMN     "function_Broher" TEXT,
ADD COLUMN     "function_Sister" TEXT,
ADD COLUMN     "function_aunt" TEXT,
ADD COLUMN     "function_father" TEXT,
ADD COLUMN     "function_grandFather" TEXT,
ADD COLUMN     "function_grandMother" TEXT,
ADD COLUMN     "function_mother" TEXT,
ADD COLUMN     "function_uncle" TEXT,
ADD COLUMN     "responsible" "Responsible";
