/*
  Warnings:

  - You are about to drop the column `user_id` on the `address` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_user_id_fkey";

-- AlterTable
ALTER TABLE "address" DROP COLUMN "user_id";
