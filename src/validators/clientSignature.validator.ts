import Joi from "joi";
export const clientSignatureSchema = Joi.object({
  signature: Joi.string().required(),
  pin: Joi.string().required(),
});
