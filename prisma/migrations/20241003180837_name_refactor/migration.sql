/*
  Warnings:

  - The primary key for the `Resource` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Country` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "NLP" DROP CONSTRAINT "NLP_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "_ResourceCountry" DROP CONSTRAINT "_ResourceCountry_B_fkey";

-- AlterTable
ALTER TABLE "NLP" ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "resourceId" SET DATA TYPE TEXT,
ADD CONSTRAINT "NLP_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "NLP_id_seq";

-- AlterTable
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Resource_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Resource_id_seq";

-- AlterTable
ALTER TABLE "_ResourceCountry" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Country_id_key" ON "Country"("id");

-- AddForeignKey
ALTER TABLE "NLP" ADD CONSTRAINT "NLP_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResourceCountry" ADD CONSTRAINT "_ResourceCountry_B_fkey" FOREIGN KEY ("B") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;
