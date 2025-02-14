import Joi from "joi";

export const familyMedicalHistorySchema = Joi.object({
  familyhistory: Joi.string().required(),
});
