-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "State" ADD VALUE 'PROCESSED';
ALTER TYPE "State" ADD VALUE 'IN_STOCK';
ALTER TYPE "State" ADD VALUE 'RETURNED';
ALTER TYPE "State" ADD VALUE 'PARTIALLY_DELIVERED';
ALTER TYPE "State" ADD VALUE 'SCHEDULED';

-- AlterTable
ALTER TABLE "donations" ALTER COLUMN "date" DROP NOT NULL,
ALTER COLUMN "date" DROP DEFAULT,
ALTER COLUMN "date" SET DATA TYPE TEXT;
