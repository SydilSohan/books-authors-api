import { Request, Response, NextFunction } from "express";
import Joi, { ValidationErrorItem, Schema } from "joi";
import { ValidationError } from "../Utils/Errors";

export const validateMiddleware = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const validationErrorDetails = error.details.map(
        (detail: ValidationErrorItem) => ({
          field: detail.path.join("."),
          message: detail.message,
        })
      );
      console.log(validationErrorDetails);
      return next(new ValidationError(validationErrorDetails));
    }
    next();
  };
};
