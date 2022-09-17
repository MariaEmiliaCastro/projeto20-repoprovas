import { Router } from "express";
import UserController from "../controllers/userController";
import { validateSchemaMiddleware } from '../middlewares/validateSchema';
import { UserSchema } from "../schemas/userSchema";

const UserRoutes = Router();

UserRoutes.post("/sign-up", validateSchemaMiddleware(UserSchema), UserController.createUser);
UserRoutes.post("/login", validateSchemaMiddleware(UserSchema), UserController.loginUser);

export default UserRoutes;