/*
  Warnings:

  - You are about to drop the column `main` on the `question_template` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "question_template" DROP COLUMN "main";

-- CreateTable
CREATE TABLE "testcases" (
    "id" SERIAL NOT NULL,
    "template_id" INTEGER NOT NULL,
    "main" TEXT NOT NULL,

    CONSTRAINT "testcases_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "testcases" ADD CONSTRAINT "testcases_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "question_template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
