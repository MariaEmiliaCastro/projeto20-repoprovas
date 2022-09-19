import TestRepository from "../repositories/testRepository";
import { prisma, Tests } from "@prisma/client";
import { createTest, testObject } from "../types/testTypes";
import UtilsRepository from "../utils/UtilsRepository";
import UtilsService from "../utils/UtilsService";


const TestService = {
    saveTest: async (testData: testObject) => {
        const categoryId = await UtilsRepository.getCategoryId(testData.category);

        if(categoryId === null){
            throw { type: 'not_found', message: 'category not found'}
        }

        const teacherId = await UtilsRepository.getTeacherId(testData.teacher);
        const disciplineId = await UtilsRepository.getDisciplineId(testData.discipline);
        
        if(teacherId === null || disciplineId === null) {
            throw { type: 'not_found', message: 'Not Found!'}
        }
        
        const relationship = await UtilsService.relationshipExists(teacherId.id, disciplineId.id);

        const createTest : createTest = {
            name: testData.name,
            pdfUrl: testData.pdfUrl,
            categoryId: categoryId.id,
            teachersDisciplinesId: relationship.id
        }

        await TestRepository.saveTest(createTest);
    },
    getAllTestsByTeacher: async () => {

        const categoryList = await TestRepository.getAllCategories();
        const disciplineList = await TestRepository.getAllDisciplines();

        const data = await TestRepository.getAllTestsByTeacher();

        const newData = data.map((teacher) => {
            const newTeacher = {
                name: teacher.name,
                category: categoryList.map(categoryList => {
                    return {
                        name: categoryList.name,
                        tests: teacher.teacherDisciplines.map(teacherDisciplines => {
                            return teacherDisciplines.tests.map(test => {
                                if (test.categoryId === categoryList.id) {
                                    return {
                                        name: test.name,
                                        pdfUrl: test.pdfUrl,
                                        discipline: disciplineList.filter(discipline => discipline.id === test.teachersDisciplines.disciplineId)[0].name
                                    }
                                }
                            })
                        })
                    }
                })
            }

            return newTeacher;
        });

        // clean all null or empty values
        const cleanData = newData.map((teacher) => {
            const newTeacher = {
                name: teacher.name,
                category: teacher.category.map(category => {
                    return {
                        name: category.name,
                        tests: category.tests.map(tests => {
                            return tests.filter(test => test !== null && test !== undefined);
                        })
                    }
                })
            }

            return newTeacher;
        });

        // remove empty arrays
        const finalData = cleanData.map((teacher) => {
            const newTeacher = {
                name: teacher.name,
                category: teacher.category.map(category => {
                    return {
                        name: category.name,
                        tests: category.tests.filter(tests => tests.length > 0)
                    }
                })
            }

            return newTeacher;
        });

       
        return finalData;
    },
    getAllTestsByDiscipline: async () => {
        
        const categoryList = await TestRepository.getAllCategories();
        const disciplineList = await TestRepository.getAllDisciplines();
        const teacherList = await TestRepository.getAllTeachers();
        const termsList = await TestRepository.getAllTerms();

        const data = await TestRepository.getAllTestsByDiscipline();

        const groupByTerm = termsList.map(term => {
            return {
                number: term.number,
                discipline: disciplineList.map(discipline => {
                    if(discipline.termId === term.id) {
                        return {
                            name: discipline.name,
                            tests: data.map(test => {
                                if(test.teachersDisciplines?.disciplineId === discipline.id) {
                                    return {
                                        name: test.name,
                                        pdfUrl: test.pdfUrl,
                                        category: categoryList.find(category => category.id === test.categoryId)?.name,
                                        teacher: teacherList.find(teacher => teacher.id === test.teachersDisciplines?.teacherId)?.name
                                    }
                                }
                            })
                        }
                    }
                })
            }
        });
        
        const cleanData = groupByTerm.map(term => {
            return {
                number: term.number,
                discipline: term.discipline.map(discipline => {
                    return {
                        name: discipline?.name,
                        tests: discipline?.tests.filter(test => test !== null && test !== undefined)
                    }
                })
            }
        });

        const removeEmptyObjects = cleanData.map(term => {
            return {
                number: term.number,
                discipline: term.discipline.filter(discipline => discipline.name !== undefined)
            }
        });

        return removeEmptyObjects;
    }
};

export default TestService;