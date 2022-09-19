import { Request, Response } from "express";
import TestService from "../services/testService";
import { testObject } from "../types/testTypes";


const TestController = {
    saveTest: async (req: Request, res: Response) => {
        const testData : testObject = req.body;

        console.log(testData);

        await TestService.saveTest(testData);

        res.sendStatus(201);
    },
    getAllTestsByTeacher: async (req: Request, res: Response) => {
        const data = await TestService.getAllTestsByTeacher();

        res.send(data).status(200);
    },
    getAllTestsByDiscipline: async (req: Request, res: Response) => {
        const data = await TestService.getAllTestsByDiscipline();

        res.send(data).status(200);
    }
};

export default TestController;