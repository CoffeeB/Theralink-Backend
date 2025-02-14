import Joi from "joi";
export const diagnosisSchema = Joi.object({
  description: Joi.string().required(),
  diagnosisCode: Joi.string().required(),
  diagnosisDate: Joi.date().required(),
});
