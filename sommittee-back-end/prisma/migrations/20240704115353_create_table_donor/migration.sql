-- CreateEnum
CREATE TYPE "Type_donor" AS ENUM ('INTERNAL', 'EXTERNAL');

-- CreateTable
CREATE TABLE "donors" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "cpf" CHAR(14) NOT NULL,
    "email" TEXT NOT NULL,
    "contact" CHAR(15) NOT NULL,
    "type_donor" "Type_donor" NOT NULL,

    CONSTRAINT "donors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "donors_cpf_key" ON "donors"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "donors_email_key" ON "donors"("email");
