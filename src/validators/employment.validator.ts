
import Joi from "joi";
export const employmentSchema = Joi.object({
  organizationName: Joi.string().required(),
  designation: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  responsibilities: Joi.string().required(),
});
