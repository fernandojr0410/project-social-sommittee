/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `people` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `people` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `people` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `people` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "people" ADD COLUMN "cpf" VARCHAR(255) DEFAULT 'default_cpf';
ALTER TABLE "people" ADD COLUMN "email" VARCHAR(255) DEFAULT 'default_email';


-- CreateIndex
CREATE UNIQUE INDEX "people_cpf_key" ON "people"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "people_email_key" ON "people"("email");
