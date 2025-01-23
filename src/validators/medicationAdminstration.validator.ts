import Joi from "joi";
export const medicationAdminstrationSchema = Joi.object({
  name: Joi.string().required(),
  route: Joi.string().required(),
  notes: Joi.string().required(),
  initials: Joi.string().required(),
  frequency: Joi.number().required(),
  administeredDate: Joi.date().required(),
});
