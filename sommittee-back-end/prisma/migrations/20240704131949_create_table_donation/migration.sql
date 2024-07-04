-- CreateEnum
CREATE TYPE "State" AS ENUM ('DELIVERED', 'PENDING', 'CANCELED', 'ON_ROUTE');

-- CreateTable
CREATE TABLE "donations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "description" TEXT NOT NULL,
    "state" "State" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "address_zip_code" TEXT NOT NULL,
    "address_street" TEXT NOT NULL,
    "address_complement" TEXT,
    "address_neighborhood" TEXT NOT NULL,
    "address_city" TEXT NOT NULL,
    "address_state" CHAR(2) NOT NULL,
    "user_id" UUID NOT NULL,
    "donor_id" UUID NOT NULL,

    CONSTRAINT "donations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_donor_id_fkey" FOREIGN KEY ("donor_id") REFERENCES "donors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
