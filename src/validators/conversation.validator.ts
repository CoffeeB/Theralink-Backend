import Joi from "joi";
export const conversationSchema = Joi.object({
  lastMessage: Joi.string().optional(),
});
