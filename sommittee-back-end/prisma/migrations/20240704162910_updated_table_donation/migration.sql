-- DropForeignKey
ALTER TABLE "donations" DROP CONSTRAINT "donations_donor_id_fkey";

-- DropForeignKey
ALTER TABLE "donations" DROP CONSTRAINT "donations_user_id_fkey";

-- AlterTable
ALTER TABLE "donations" ALTER COLUMN "user_id" DROP NOT NULL,
ALTER COLUMN "donor_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_donor_id_fkey" FOREIGN KEY ("donor_id") REFERENCES "donors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
