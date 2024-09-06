/*
  Warnings:

  - You are about to drop the column `amount` on the `receiveds` table. All the data in the column will be lost.
  - Added the required column `condition_product` to the `receiveds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `receiveds` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Condition_product" AS ENUM ('NEW', 'USED', 'DAMAGED');

-- AlterTable
ALTER TABLE "receiveds" DROP COLUMN "amount",
ADD COLUMN     "condition_product" "Condition_product" NOT NULL,
ADD COLUMN     "user_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "receiveds" ADD CONSTRAINT "receiveds_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
