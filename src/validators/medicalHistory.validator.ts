import Joi from "joi";
import { SubstanceAddictionType, BehaviouralAddictionType } from "@prisma/client";

export const medicalHistorySchema = Joi.object({
  history: Joi.string().required(),
  addictionDetails: Joi.string().required(),
  date: Joi.date().required(),
  allergies: Joi.boolean().required(),
  sexualAbuse: Joi.boolean().required(),
  pregnantBefore: Joi.boolean().required(),
  expectingPregnancy: Joi.boolean().required(),
  abortion: Joi.boolean().required(),
  breastCancer: Joi.boolean().required(),
  substances: Joi.string()
    .valid(...Object.values(SubstanceAddictionType))
    .required(),
    behaviours: Joi.string()
    .valid(...Object.values(BehaviouralAddictionType))
    .required(),
});
