-- AddForeignKey
ALTER TABLE "people_family" ADD CONSTRAINT "people_family_family_id_fkey" FOREIGN KEY ("family_id") REFERENCES "families"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
