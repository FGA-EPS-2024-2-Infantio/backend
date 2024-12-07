/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `teacher` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "teacher_cpf_key" ON "teacher"("cpf");
