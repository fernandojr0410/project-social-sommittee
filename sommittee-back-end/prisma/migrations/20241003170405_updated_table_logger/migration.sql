/*
  Warnings:

  - You are about to drop the column `description` on the `loggers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "loggers" DROP COLUMN "description",
ADD COLUMN     "payload" JSONB;
