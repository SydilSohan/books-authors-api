//simple id validator middleware

import { BadRequetError } from "@src/exceptions/BadRequest";
import { ErrorCodes } from "@src/exceptions/CustomError";
import { Response, Request, NextFunction } from "express";
export function validateParams(
  req: Request<{ id: string | null }, {}, {}>,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  if (id && isNaN(parseInt(id))) {
    ///if :id param exists then check if its a valid number otherwise send validation error
    throw new BadRequetError(
      "id must be a number",
      ErrorCodes.VALIDATION_ERROR
    );
  }
  next();
}
