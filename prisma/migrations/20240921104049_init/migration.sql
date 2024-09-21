-- DropForeignKey
ALTER TABLE "NLP" DROP CONSTRAINT "NLP_resourseId_fkey";

-- AddForeignKey
ALTER TABLE "NLP" ADD CONSTRAINT "NLP_resourseId_fkey" FOREIGN KEY ("resourseId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;
