/*
  Warnings:

  - You are about to drop the column `issueDate` on the `receipts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "receipts" DROP COLUMN "issueDate",
ADD COLUMN     "issue_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
