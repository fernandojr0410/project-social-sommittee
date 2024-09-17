-- AlterTable
ALTER TABLE "donations" ADD COLUMN     "family_id" UUID,
ADD COLUMN     "people_id" UUID;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_people_id_fkey" FOREIGN KEY ("people_id") REFERENCES "people"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_family_id_fkey" FOREIGN KEY ("family_id") REFERENCES "families"("id") ON DELETE SET NULL ON UPDATE CASCADE;
