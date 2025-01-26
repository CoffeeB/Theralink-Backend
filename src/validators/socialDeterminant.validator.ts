import Joi from "joi";
export const socialDeterminantSchema = Joi.object({
  finance: Joi.string().required(),
  food: Joi.string().optional(),
  transportation: Joi.string().optional(),
  activity: Joi.string().required(),
});
