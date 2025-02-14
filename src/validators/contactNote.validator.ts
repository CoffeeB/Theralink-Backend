import Joi from "joi";
import { contactMethodStatus, contactedStatus } from "@prisma/client";

export const contactNoteSchema = Joi.object({
  staff: Joi.string().required(),
  note: Joi.string().required(),
  contactDate: Joi.date().required(),
  contactTime: Joi.date().required(),
  contactMethod: Joi.string()
    .valid(...Object.values(contactMethodStatus))
    .required(),
    contacted: Joi.string()
    .valid(...Object.values(contactedStatus))
    .required(),
});
