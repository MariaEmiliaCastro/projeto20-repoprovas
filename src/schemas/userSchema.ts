import Joi from "joi";

export const UserSchema = Joi.object().keys({
    email : Joi.string().email().required(),
    password : Joi.string().min(1).required()
})