-- AlterTable
ALTER TABLE "Resource" ALTER COLUMN "isGlobal" DROP NOT NULL,
ALTER COLUMN "isGlobal" DROP DEFAULT;