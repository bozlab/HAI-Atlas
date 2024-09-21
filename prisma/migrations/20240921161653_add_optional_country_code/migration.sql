/*
  Warnings:

  - You are about to drop the column `geometry` on the `Country` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Country" DROP COLUMN "geometry",
ADD COLUMN     "countryCode" TEXT;
