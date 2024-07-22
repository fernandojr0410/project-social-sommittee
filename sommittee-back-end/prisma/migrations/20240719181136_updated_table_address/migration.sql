-- AlterTable
ALTER TABLE "address" ADD COLUMN     "user_id" UUID,
ALTER COLUMN "state" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
