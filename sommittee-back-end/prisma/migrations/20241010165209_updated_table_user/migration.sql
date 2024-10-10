-- AlterTable
ALTER TABLE "users" ADD COLUMN     "is_verification_code" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sms_verification_code" TEXT;
