import { Router } from "express";
import { validateSchemaMiddleware } from '../middlewares/validateSchema';
import validateJWT from "../middlewares/validateJwtMiddleware";
import { testsSchema } from "../schemas/testsSchema";
import TestController from "../controllers/testController";

const TestRoutes = Router();

TestRoutes.post("/save-test", validateJWT, validateSchemaMiddleware(testsSchema), TestController.saveTest);
TestRoutes.get("/all-tests-teacher", validateJWT, TestController.getAllTestsByTeacher);
TestRoutes.get("/all-tests-discipline", validateJWT, TestController.getAllTestsByDiscipline);

export default TestRoutes;