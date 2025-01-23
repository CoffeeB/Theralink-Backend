import Joi from 'joi';
import { LedgerType } from '@prisma/client';
export const ledgerSchema = Joi.object({
    description: Joi.string().required(),
    paymentType: Joi.string().required(),
    amount: Joi.number().required(),
    ledgerDate: Joi.date().required(),
    ledgerType: Joi.string().valid(...Object.values(LedgerType)).required(),
    
});
