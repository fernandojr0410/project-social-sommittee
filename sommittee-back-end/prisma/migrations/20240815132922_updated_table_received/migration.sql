/*
  Warnings:

  - You are about to drop the column `address_id` on the `receiveds` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "receiveds" DROP CONSTRAINT "receiveds_address_id_fkey";

-- AlterTable
ALTER TABLE "receiveds" DROP COLUMN "address_id";
