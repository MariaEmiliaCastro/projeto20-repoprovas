import { User } from '@prisma/client';
import { CreateUser } from "../types/userTypes";
import UserRepository from '../repositories/userRepository';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const bcrypt = require('bcrypt');

const UserService = {
    createUser: async (userData: CreateUser) => {
        const userExists = await UserRepository.getUserByEmail(userData.email);

        if(userExists){
            throw { type: "conflict", message: "user already registered!" };
        }

        userData.password = bcrypt.hashSync(userData.password, 10);

        await UserRepository.createUser(userData);
    },
    loginUser: async (userData: CreateUser) => {
        const userExists = await UserRepository.getUserByEmail(userData.email);
        
        if(userExists){
            const validatePassword : boolean = bcrypt.compareSync(userData.password, userExists?.password);
            if(validatePassword){
                const SECRET: string = process.env.JWT_SECRET ?? ' ';
                const EXPIRES_IN: string = process.env.JWT_EXPIRES_IN as string;
    
                const payload = {
                    id: userExists.id,
                    email: userExists.email
                }
    
                const token = jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN })
    
                return token;
            }
            throw { type: "not_found", message: "wrong data!" };
        }

        throw { type: "not_found", message: "user data not found!" };
    }
};

export default UserService;