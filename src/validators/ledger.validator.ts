import Joi from 'joi';
import { LedgerType,paymentTypeStatus } from '@prisma/client';
export const ledgerSchema = Joi.object({
    description: Joi.string().required(),
    amount: Joi.number().required(),
    ledgerDate: Joi.date().required(),
    ledgerType: Joi.string().valid(...Object.values(LedgerType)).required(),
    paymentType: Joi.string().valid(...Object.values(paymentTypeStatus)).required(),
    
});
