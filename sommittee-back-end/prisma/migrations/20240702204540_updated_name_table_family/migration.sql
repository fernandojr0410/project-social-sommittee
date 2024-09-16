/*
  Warnings:

  - You are about to drop the `family` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "family" DROP CONSTRAINT "family_address_id_fkey";

-- DropForeignKey
ALTER TABLE "people_family" DROP CONSTRAINT "people_family_family_id_fkey";

-- DropTable
DROP TABLE "family";

-- CreateTable
CREATE TABLE "families" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "address_id" UUID NOT NULL,

    CONSTRAINT "families_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "families" ADD CONSTRAINT "families_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "people_family" ADD CONSTRAINT "people_family_family_id_fkey" FOREIGN KEY ("family_id") REFERENCES "families"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
