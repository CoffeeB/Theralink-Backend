import { educationLevelStatus } from "@prisma/client";
import Joi from "joi";
export const educationBackgroundSchema = Joi.object({
  degree: Joi.string().required(),
  grade: Joi.string().required(),
  yearOfPassing: Joi.string().required(),
  educationLevel: Joi.string()
    .valid(...Object.values(educationLevelStatus))
    .required(),
});
