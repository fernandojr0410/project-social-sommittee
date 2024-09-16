/*
  Warnings:

  - You are about to drop the column `function_Brother` on the `people_family` table. All the data in the column will be lost.
  - You are about to drop the column `function_Sister` on the `people_family` table. All the data in the column will be lost.
  - You are about to drop the column `function_aunt` on the `people_family` table. All the data in the column will be lost.
  - You are about to drop the column `function_father` on the `people_family` table. All the data in the column will be lost.
  - You are about to drop the column `function_grandFather` on the `people_family` table. All the data in the column will be lost.
  - You are about to drop the column `function_grandMother` on the `people_family` table. All the data in the column will be lost.
  - You are about to drop the column `function_mother` on the `people_family` table. All the data in the column will be lost.
  - You are about to drop the column `function_uncle` on the `people_family` table. All the data in the column will be lost.
  - You are about to drop the column `name_responsible_main` on the `people_family` table. All the data in the column will be lost.
  - You are about to drop the column `name_responsible_secondary` on the `people_family` table. All the data in the column will be lost.
  - You are about to drop the column `responsible` on the `people_family` table. All the data in the column will be lost.
  - You are about to drop the column `work` on the `people_family` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "people_family" DROP CONSTRAINT "people_family_family_id_fkey";

-- DropForeignKey
ALTER TABLE "people_family" DROP CONSTRAINT "people_family_people_id_fkey";

-- AlterTable
ALTER TABLE "families" ADD COLUMN     "people_id" UUID;

-- AlterTable
ALTER TABLE "people_family" DROP COLUMN "function_Brother",
DROP COLUMN "function_Sister",
DROP COLUMN "function_aunt",
DROP COLUMN "function_father",
DROP COLUMN "function_grandFather",
DROP COLUMN "function_grandMother",
DROP COLUMN "function_mother",
DROP COLUMN "function_uncle",
DROP COLUMN "name_responsible_main",
DROP COLUMN "name_responsible_secondary",
DROP COLUMN "responsible",
DROP COLUMN "work",
ADD COLUMN     "function" TEXT,
ALTER COLUMN "people_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "families" ADD CONSTRAINT "families_people_id_fkey" FOREIGN KEY ("people_id") REFERENCES "people"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "people_family" ADD CONSTRAINT "people_family_people_id_fkey" FOREIGN KEY ("people_id") REFERENCES "people"("id") ON DELETE SET NULL ON UPDATE CASCADE;
