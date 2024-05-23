-- AlterTable
CREATE SEQUENCE usuários_id_seq;
ALTER TABLE "usuários" ALTER COLUMN "id" SET DEFAULT nextval('usuários_id_seq');
ALTER SEQUENCE usuários_id_seq OWNED BY "usuários"."id";
