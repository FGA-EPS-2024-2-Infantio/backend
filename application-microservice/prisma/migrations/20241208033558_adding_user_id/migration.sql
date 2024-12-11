/*
  Warnings:

  - You are about to drop the column `directorId` on the `School` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `School` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `teacher` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `teacher` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "School_directorId_key";

-- AlterTable
ALTER TABLE "School" DROP COLUMN "directorId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "teacher" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "School_userId_key" ON "School"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "teacher_userId_key" ON "teacher"("userId");
