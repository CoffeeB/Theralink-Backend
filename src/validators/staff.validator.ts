import Joi from 'joi';
import { Gender, Race } from '@prisma/client';

export const staffSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    prefix: Joi.string().optional(),
    ssn: Joi.string().optional(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    gender: Joi.string().valid(...Object.values(Gender)).required(),
    middleName: Joi.string().optional(),
    userName: Joi.string().optional(),
    suffix: Joi.string().optional(),
    accessLevel: Joi.string().optional(),
    race: Joi.string().valid(...Object.values(Race)).required(),
    dateOfBirth: Joi.date().required(),
    positionEffectiveDate: Joi.date().required(),
});
