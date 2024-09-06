/*
  Warnings:

  - You are about to drop the column `userId` on the `donations` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `donors` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `receiveds` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "donations" DROP CONSTRAINT "donations_userId_fkey";

-- DropForeignKey
ALTER TABLE "donors" DROP CONSTRAINT "donors_user_id_fkey";

-- DropForeignKey
ALTER TABLE "receiveds" DROP CONSTRAINT "receiveds_user_id_fkey";

-- AlterTable
ALTER TABLE "donations" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "donors" DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "receiveds" DROP COLUMN "user_id";
