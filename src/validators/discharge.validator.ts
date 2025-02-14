import Joi from "joi";
import { dischargeReasonType } from "@prisma/client";

export const dischargeSchema = Joi.object({
  summary: Joi.string().required(),
  linkDocument: Joi.string().required(),
  dischargeDate: Joi.date().required(),
  reason: Joi.string()
    .valid(...Object.values(dischargeReasonType))
    .required(),
});
