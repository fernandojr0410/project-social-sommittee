/*
  Warnings:

  - Added the required column `file_path` to the `attachments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "attachments" ADD COLUMN     "file_path" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "receipts" ALTER COLUMN "receiver_signature" DROP NOT NULL,
ALTER COLUMN "additional_notes" DROP NOT NULL;
