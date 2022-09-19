/*
  Warnings:

  - The primary key for the `TeachersDisciplines` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `disciplineId` on the `Tests` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `Tests` table. All the data in the column will be lost.
  - Added the required column `teachersDisciplinesId` to the `Tests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tests" DROP CONSTRAINT "Tests_teacherId_disciplineId_fkey";

-- AlterTable
ALTER TABLE "TeachersDisciplines" DROP CONSTRAINT "TeachersDisciplines_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "TeachersDisciplines_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Tests" DROP COLUMN "disciplineId",
DROP COLUMN "teacherId",
ADD COLUMN     "teachersDisciplinesId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Tests" ADD CONSTRAINT "Tests_teachersDisciplinesId_fkey" FOREIGN KEY ("teachersDisciplinesId") REFERENCES "TeachersDisciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
