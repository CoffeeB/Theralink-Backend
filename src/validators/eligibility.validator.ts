import Joi from 'joi';
import { eligibilityStatus } from '@prisma/client';
export const eligibilitySchema = Joi.object({
    notes: Joi.string().required(),
    checkedAt: Joi.date().required(),
    eligibilityStatus: Joi.string().valid(...Object.values(eligibilityStatus)).required(),
});
