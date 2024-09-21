/*
  Warnings:

  - You are about to drop the column `country` on the `Resource` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "country";

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "geometry" JSONB NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ResourceCountry" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ResourceCountry_AB_unique" ON "_ResourceCountry"("A", "B");

-- CreateIndex
CREATE INDEX "_ResourceCountry_B_index" ON "_ResourceCountry"("B");

-- AddForeignKey
ALTER TABLE "_ResourceCountry" ADD CONSTRAINT "_ResourceCountry_A_fkey" FOREIGN KEY ("A") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResourceCountry" ADD CONSTRAINT "_ResourceCountry_B_fkey" FOREIGN KEY ("B") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;
