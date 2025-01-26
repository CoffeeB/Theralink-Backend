import Joi from "joi";
export const parentSignatureSchema = Joi.object({
  signature: Joi.string().required(),
  pin: Joi.string().required(),
});
