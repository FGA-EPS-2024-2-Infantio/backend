/*
  Warnings:

  - You are about to drop the column `age` on the `teacher` table. All the data in the column will be lost.
  - Added the required column `numberOfClasses` to the `teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "teacher" DROP COLUMN "age",
ADD COLUMN     "numberOfClasses" INTEGER NOT NULL;
