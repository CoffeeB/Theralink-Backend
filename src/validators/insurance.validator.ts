import Joi from 'joi';
import { insuranceStatus,eligibilityStatus } from '@prisma/client';
export const insuranceSchema = Joi.object({
    policyNumber: Joi.string().required(),
    insuranceType: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().optional(),
    status: Joi.string().valid(...Object.values(insuranceStatus)).required(),
    eligibilityStatus: Joi.string().valid(...Object.values(eligibilityStatus)).required(),
});
