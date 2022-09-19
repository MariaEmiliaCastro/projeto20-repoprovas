import { prisma } from "../config/database";

const UtilsRepository = {
    getCategoryId: async (categoryName: string) => {
        const categoryId = await prisma.categories.findUnique({
            where: {
                name: categoryName
            } 
        })

        return categoryId;
    },
    getTeacherId: async (teacherName: string) => {
        const teacherId = await prisma.teachers.findFirst({
            where: {
                name: teacherName
            }
        })

        return teacherId;
    },
    getDisciplineId: async (disciplineName: string) => {
        const disciplineId = await prisma.disciplines.findFirst({
            where: {
                name: disciplineName
            }
        })

        return disciplineId;
    },
    relationshipExists:async (teacherId: number, disciplineId:number) => {
        const relationship = await prisma.teachersDisciplines.findFirst({
            where: {
                disciplineId: disciplineId,
                teacherId: teacherId
            }
        })

        return relationship;
    }
};

export default UtilsRepository;