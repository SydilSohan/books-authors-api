// global error handler use to catch errors from uncaught errors and next fn throw error
import { CustomError } from "@src/exceptions/CustomError";
import { ValidationError } from "@src/exceptions/ErrorClasses";
import logger from "@src/utils/logger";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { method, url, headers, body } = req;
  const userAgent = headers["user-agent"] || "unknown";

  if (err instanceof CustomError) {
    //handle known errors
    logger.error(err.message, {
      method,
      url,
      userAgent,
      body,
      statusCode: err.statusCode,
    });
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      statusCode: err.statusCode,
      ...(err instanceof ValidationError && { details: err.details }),
    });
  } else {
    //handle unknowm errors
    logger.error("Internal Server Error", {
      method,
      url,
      userAgent,
      body,
      statusCode: 500,
    });
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      statusCode: 500,
    });
  }
};
