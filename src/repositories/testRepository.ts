import { prisma } from "../config/database";
import { createTest } from "../types/testTypes";

const TestRepository = {
    saveTest: async (testObject: createTest) => {
        await prisma.tests.create({
            data: testObject
        })
    },
    getAllTestsByTeacher: async () => {

        const categoryList = await prisma.categories.findMany();
        const disciplineList = await prisma.disciplines.findMany();

        const data = await prisma.teachers.findMany({
            select: {
                name: true,
                teacherDisciplines: {
                    select: {
                        tests: {
                            select: {
                                name: true,
                                pdfUrl: true,
                                categoryId: true,
                                teachersDisciplines: {
                                    select: {
                                        disciplineId: true,
                                        teacherId: true
                                    }
                                }
                            },
                            orderBy: {
                                categoryId: 'asc'
                            }
                        }
                    }
                }
            }

        });
        return data;
    },
    getAllTestsByDiscipline: async () => {
        const categoryList = await prisma.categories.findMany();
        const disciplineList = await prisma.disciplines.findMany();
        const teacherList = await prisma.teachers.findMany();
        const termsList = await prisma.terms.findMany();
        
        const data = await prisma.tests.findMany({
            select: {
                name: true,
                pdfUrl: true,
                categoryId: true,
                teachersDisciplines: {
                    select: {
                        disciplineId: true,
                        teacherId: true
                    }
                }
            }
        });

        return data;
    },
    getAllCategories: async () => {
        const data = await prisma.categories.findMany();

        return data;
    },
    getAllDisciplines: async () => {
        const data = await prisma.disciplines.findMany();

        return data;
    },
    getAllTeachers: async () => {
        const data = await prisma.teachers.findMany();

        return data;
    },
    getAllTerms: async () => {
        const data = await prisma.terms.findMany();

        return data;
    }
};

export default TestRepository;