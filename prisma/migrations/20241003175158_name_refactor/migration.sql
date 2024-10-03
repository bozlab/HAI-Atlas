/*
  Warnings:

  - You are about to drop the column `resourseId` on the `NLP` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "NLP" DROP CONSTRAINT "NLP_resourseId_fkey";

-- AlterTable
ALTER TABLE "NLP" DROP COLUMN "resourseId",
ADD COLUMN     "resourceId" INTEGER;

-- AddForeignKey
ALTER TABLE "NLP" ADD CONSTRAINT "NLP_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;
