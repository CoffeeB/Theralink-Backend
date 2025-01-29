import Joi from "joi";
export const messageSchema = Joi.object({
  body: Joi.string().required(),
  subject: Joi.string().required(),
  isRead: Joi.boolean().required(),
  isImportant: Joi.boolean().required(),
  broadcast: Joi.boolean().optional(),
  uniCast: Joi.boolean().optional(),
  isSpam: Joi.boolean().required(),
  isDeleted: Joi.boolean().required(),
  image: Joi.string().optional(),
  room: Joi.string().optional(),
  toUserId: Joi.string().required(),
});
