import { Request, Response } from "express";
import { CreateUser } from "../types/userTypes";
import UserService from "../services/userService";

const UserController = {
    createUser: async (req: Request, res: Response) => {
        const userData : CreateUser = req.body;

        await UserService.createUser(userData);

        res.sendStatus(201);
    },
    loginUser: async (req: Request, res: Response) => {
        const userData : CreateUser = req.body;

        const token: string = await UserService.loginUser(userData);

        res.send({token}).status(200);
    }
};

export default UserController;