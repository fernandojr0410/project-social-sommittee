/*
  Warnings:

  - Added the required column `surname` to the `donors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "donors" ADD COLUMN     "surname" TEXT NOT NULL;
