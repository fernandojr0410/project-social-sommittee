/*
  Warnings:

  - You are about to drop the column `receipt_id` on the `purchases` table. All the data in the column will be lost.
  - Added the required column `received_id` to the `purchases` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "purchases" DROP CONSTRAINT "purchases_receipt_id_fkey";

-- AlterTable
ALTER TABLE "purchases" DROP COLUMN "receipt_id",
ADD COLUMN     "received_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_received_id_fkey" FOREIGN KEY ("received_id") REFERENCES "receiveds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
