/*
  Warnings:

  - A unique constraint covering the columns `[identifier]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_identifier_key" ON "users"("identifier");
