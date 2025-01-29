import Joi from 'joi';
import { Gender, Race } from '@prisma/client';

export const patientSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    gender: Joi.string().valid(...Object.values(Gender)).required(),
    middleName: Joi.string().optional(),
    nickName: Joi.string().optional(),
    suffix: Joi.string().optional(),
    race: Joi.string().valid(...Object.values(Race)).optional(),
    dateOfBirth: Joi.date().required(),
    startDate: Joi.date().optional(),
    address: Joi.object().optional(),
});
