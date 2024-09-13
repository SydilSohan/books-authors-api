import Joi from "joi";
export const authorSchema = Joi.object({
  name: Joi.string().min(3).required(),
  bio: Joi.string().min(10).required(),
  birthdate: Joi.date().iso().required(), // Ensure birthdate is in ISO-8601 format
});
export const bookSchema = Joi.object({
  title: Joi.string().min(3).required(),
  author: Joi.number().required(),
  published_date: Joi.date().iso().required(),
  description: Joi.string().min(10).required(),
  // Ensure published_date is in ISO-8601 format
});
