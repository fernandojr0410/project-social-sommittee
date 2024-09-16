-- AlterTable
ALTER TABLE "products" ADD COLUMN     "donor_id" UUID;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_donor_id_fkey" FOREIGN KEY ("donor_id") REFERENCES "donors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
