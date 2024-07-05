-- CreateTable
CREATE TABLE "loggers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "data" JSONB,
    "path" TEXT,
    "status" INTEGER NOT NULL DEFAULT 0,
    "user_id" UUID NOT NULL,
    "method" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "loggers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "loggers" ADD CONSTRAINT "loggers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
