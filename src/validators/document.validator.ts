import Joi from 'joi';
export const documentSchema = Joi.object({
    filePath: Joi.string().required(),
    fileType: Joi.string().required(),
    description: Joi.date().optional(),
});
