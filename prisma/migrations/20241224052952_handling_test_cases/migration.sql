/*
  Warnings:

  - Added the required column `status` to the `codes_run` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expected_output` to the `testcases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `input` to the `testcases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "codes_run" ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "testcases" ADD COLUMN     "expected_output" TEXT NOT NULL,
ADD COLUMN     "input" TEXT NOT NULL;
