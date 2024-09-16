-- AlterTable
ALTER TABLE "receipts" ALTER COLUMN "issue_date" DROP DEFAULT,
ALTER COLUMN "issue_date" SET DATA TYPE TEXT;
