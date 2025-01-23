import Joi from 'joi';
export const medicationSchema = Joi.object({
    name: Joi.string().required(),
    route: Joi.string().required(),
    purpose: Joi.string().required(),
    prescriber: Joi.string().required(),
    frequency: Joi.number().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
});
