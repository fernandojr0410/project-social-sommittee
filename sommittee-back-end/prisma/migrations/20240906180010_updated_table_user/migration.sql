/*
  Warnings:

  - You are about to drop the column `surname` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "surname",
ADD COLUMN     "identifier" TEXT;
