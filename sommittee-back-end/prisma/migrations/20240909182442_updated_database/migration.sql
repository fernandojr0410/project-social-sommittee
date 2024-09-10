-- Warnings: Ensure that you are aware of the data loss before proceeding.

-- DropForeignKey
ALTER TABLE "donations" DROP CONSTRAINT IF EXISTS "donations_stock_id_fkey";

-- DropForeignKey
ALTER TABLE "purchases" DROP CONSTRAINT IF EXISTS "purchases_received_id_fkey";

-- DropForeignKey
ALTER TABLE "purchases" DROP CONSTRAINT IF EXISTS "purchases_stock_id_fkey";

-- DropForeignKey
ALTER TABLE "receiveds" DROP CONSTRAINT IF EXISTS "receiveds_product_id_fkey";

-- DropForeignKey
ALTER TABLE "receiveds" DROP CONSTRAINT IF EXISTS "receiveds_stock_id_fkey";

-- AlterTable: Drop columns after removing constraints
ALTER TABLE "donations" DROP COLUMN IF EXISTS "stock_id";

ALTER TABLE "receiveds" DROP COLUMN IF EXISTS "product_id",
  DROP COLUMN IF EXISTS "stock_id";

-- DropTable: Ensure the table is empty or backed up
DROP TABLE IF EXISTS "purchases";

-- CreateTable: Creating new table
CREATE TABLE "received_products" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "received_id" UUID NOT NULL,
    "stock_id" UUID NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "received_products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "received_products" ADD CONSTRAINT "received_products_received_id_fkey" FOREIGN KEY ("received_id") REFERENCES "receiveds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "received_products" ADD CONSTRAINT "received_products_stock_id_fkey" FOREIGN KEY ("stock_id") REFERENCES "stocks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
