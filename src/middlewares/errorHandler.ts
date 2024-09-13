// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../Utils/CustomError";
import logger from "../Utils/logger";
import { ValidationError } from "@src/Utils/Errors";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { method, url, headers, body } = req;
  const userAgent = headers["user-agent"] || "unknown";

  if (err instanceof CustomError) {
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
