/*
  Warnings:

  - You are about to drop the column `twoFactorSecret` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "twoFactorSecret",
ADD COLUMN     "two_factor_secret" TEXT;
