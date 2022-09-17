import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const validateJWT = (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers['authorization'];

    if(!token){
        throw { code: 'unauthorized', message: 'no token sent!'};
    }

    const SECRET: string = process.env.JWT_SECRET ?? ' ';

    
    try {
        const validateToken : JwtPayload | string = jwt.verify(token, SECRET);

        res.locals.id = (<{id: string}>validateToken).id
        next();
    } catch (error) {
        console.log(error)
        res.sendStatus(409);
    }

};

export default validateJWT;