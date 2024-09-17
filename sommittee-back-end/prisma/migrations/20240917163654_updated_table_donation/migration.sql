/*
  Warnings:

  - You are about to drop the column `address_city` on the `donations` table. All the data in the column will be lost.
  - You are about to drop the column `address_complement` on the `donations` table. All the data in the column will be lost.
  - You are about to drop the column `address_neighborhood` on the `donations` table. All the data in the column will be lost.
  - You are about to drop the column `address_number` on the `donations` table. All the data in the column will be lost.
  - You are about to drop the column `address_state` on the `donations` table. All the data in the column will be lost.
  - You are about to drop the column `address_street` on the `donations` table. All the data in the column will be lost.
  - You are about to drop the column `address_zip_code` on the `donations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "donations" DROP COLUMN "address_city",
DROP COLUMN "address_complement",
DROP COLUMN "address_neighborhood",
DROP COLUMN "address_number",
DROP COLUMN "address_state",
DROP COLUMN "address_street",
DROP COLUMN "address_zip_code";
