-- AlterTable
ALTER TABLE "Resource" ADD COLUMN     "name" TEXT,
ALTER COLUMN "summary" DROP NOT NULL;
