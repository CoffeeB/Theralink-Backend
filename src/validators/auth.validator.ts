import Joi from 'joi';

export const signupSchema = Joi.object({
    email: Joi.string().email().required(),
    role: Joi.string().valid('ADMIN', 'CLIENT').required()
});

export const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});
