// validate req.body before controller function call

import { ValidationError } from "@src/exceptions/ErrorClasses";
import { Request, Response, NextFunction } from "express";
import { ValidationErrorItem, Schema } from "joi";

export const validateMiddleware = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      //if error then extract error message and fields
      const validationErrorDetails = error.details.map(
        (detail: ValidationErrorItem) => ({
          field: detail.path.join("."),
          message: detail.message,
        })
      );
      console.log(validationErrorDetails);
      //return response with array of invalid fields
      return next(new ValidationError(validationErrorDetails));
    }
    //if validation success and then simply ignore and go to next function call/controller function
    next();
  };
};
