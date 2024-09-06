/*
  Warnings:

  - You are about to drop the column `donor_id` on the `products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_donor_id_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "donor_id";
