import Joi from "joi";
export const treatmentInterventionSchema = Joi.object({
  intervention: Joi.string().required(),
  servicetype: Joi.string().optional(),
  stafftypes: Joi.string().optional(),
  customstafftypes: Joi.string().optional(),
  frequency: Joi.number().required(),
  location: Joi.number().required(),
  duration: Joi.number().required(),
});
