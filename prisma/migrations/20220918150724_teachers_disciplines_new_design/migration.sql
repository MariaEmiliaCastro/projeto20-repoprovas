/*
  Warnings:

  - The primary key for the `TeachersDisciplines` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `TeachersDisciplines` table. All the data in the column will be lost.
  - Added the required column `teacherId` to the `Tests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tests" DROP CONSTRAINT "Tests_disciplineId_fkey";

-- AlterTable
ALTER TABLE "TeachersDisciplines" DROP CONSTRAINT "TeachersDisciplines_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "TeachersDisciplines_pkey" PRIMARY KEY ("teacherId", "disciplineId");

-- AlterTable
ALTER TABLE "Tests" ADD COLUMN     "teacherId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Tests" ADD CONSTRAINT "Tests_teacherId_disciplineId_fkey" FOREIGN KEY ("teacherId", "disciplineId") REFERENCES "TeachersDisciplines"("teacherId", "disciplineId") ON DELETE RESTRICT ON UPDATE CASCADE;
