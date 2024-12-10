/*
  Warnings:

  - You are about to drop the column `numberOfClasses` on the `teacher` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "teacher" DROP COLUMN "numberOfClasses",
ADD COLUMN     "disabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "disabled_at" TIMESTAMP(3),
ADD COLUMN     "number_of_classes" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "attendance" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "class_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "has_attended" BOOLEAN NOT NULL,

    CONSTRAINT "attendance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "attendance_student_id_date_class_id_key" ON "attendance"("student_id", "date", "class_id");

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
