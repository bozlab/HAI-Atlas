-- CreateTable
CREATE TABLE "Resource" (
    "id" SERIAL NOT NULL,
    "mainLink" TEXT NOT NULL,
    "include" BOOLEAN NOT NULL,
    "country" TEXT[],
    "publisher" TEXT[],
    "additionalLinks" TEXT[],
    "publicationDate" TIMESTAMP(3) NOT NULL,
    "organizationType" TEXT[],
    "summary" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NLP" (
    "id" SERIAL NOT NULL,
    "resourseId" INTEGER NOT NULL,
    "transparency" INTEGER NOT NULL,
    "justiceAndFairness" INTEGER NOT NULL,
    "nonMaleficence" INTEGER NOT NULL,
    "responsibility" INTEGER NOT NULL,
    "privacy" INTEGER NOT NULL,
    "beneficence" INTEGER NOT NULL,
    "freedomAndAutonomy" INTEGER NOT NULL,
    "trust" INTEGER NOT NULL,
    "sustainability" INTEGER NOT NULL,
    "dignity" INTEGER NOT NULL,
    "solidarity" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Resource_id_key" ON "Resource"("id");

-- CreateIndex
CREATE UNIQUE INDEX "NLP_id_key" ON "NLP"("id");

-- AddForeignKey
ALTER TABLE "NLP" ADD CONSTRAINT "NLP_resourseId_fkey" FOREIGN KEY ("resourseId") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
