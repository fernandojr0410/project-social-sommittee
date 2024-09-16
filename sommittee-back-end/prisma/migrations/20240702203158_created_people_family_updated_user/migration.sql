-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "people" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "birth_date" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "telephone" TEXT NOT NULL,
    "work" BOOLEAN NOT NULL,
    "education" TEXT NOT NULL,
    "address_id" UUID NOT NULL,

    CONSTRAINT "people_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "family" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "address_id" UUID NOT NULL,

    CONSTRAINT "family_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "people_family" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "function" TEXT NOT NULL,
    "people_id" UUID NOT NULL,
    "family_id" UUID NOT NULL,

    CONSTRAINT "people_family_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "people" ADD CONSTRAINT "people_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "family" ADD CONSTRAINT "family_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "people_family" ADD CONSTRAINT "people_family_people_id_fkey" FOREIGN KEY ("people_id") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "people_family" ADD CONSTRAINT "people_family_family_id_fkey" FOREIGN KEY ("family_id") REFERENCES "family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
