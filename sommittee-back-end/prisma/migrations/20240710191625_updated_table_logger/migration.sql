-- DropForeignKey
ALTER TABLE "loggers" DROP CONSTRAINT "loggers_user_id_fkey";

-- AlterTable
ALTER TABLE "loggers" ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "loggers" ADD CONSTRAINT "loggers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
