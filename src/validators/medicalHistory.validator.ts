import Joi from 'joi';
import { insuranceStatus } from '@prisma/client';
export const medicalHistorySchema = Joi.object({
    provider: Joi.string().required(),
    policyNumber: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().optional(),
    status: Joi.string().valid(...Object.values(insuranceStatus)).required(),
});
