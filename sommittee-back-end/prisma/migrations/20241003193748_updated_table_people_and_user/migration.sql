/*
  Warnings:

  - You are about to drop the column `user_id` on the `people` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "people" DROP CONSTRAINT "people_user_id_fkey";

-- AlterTable
ALTER TABLE "people" DROP COLUMN "user_id";
