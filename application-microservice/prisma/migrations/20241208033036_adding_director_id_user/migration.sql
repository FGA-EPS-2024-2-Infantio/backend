/*
  Warnings:

  - A unique constraint covering the columns `[directorId]` on the table `School` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `directorId` to the `School` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "School" ADD COLUMN     "directorId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "School_directorId_key" ON "School"("directorId");
