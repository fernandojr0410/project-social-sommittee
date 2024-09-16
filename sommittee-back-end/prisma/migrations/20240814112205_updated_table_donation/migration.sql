-- Step 1: Add a new column with a temporary name
ALTER TABLE "donations" ADD COLUMN "state_temp" VARCHAR;

-- Step 2: Copy data from the existing column to the new column
UPDATE "donations" SET "state_temp" = "state"::VARCHAR;

-- Step 3: Drop the old column
ALTER TABLE "donations" DROP COLUMN "state";

-- Step 4: Rename the new column to the original column name
ALTER TABLE "donations" RENAME COLUMN "state_temp" TO "state";
