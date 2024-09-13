// src/Utils/CustomError.ts
export class CustomError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);

    // Ensure statusCode is within valid range
    if (statusCode < 400 || statusCode >= 600) {
      throw new Error(
        "Error status code must be within the range of 400 to 599"
      );
    }
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor); // Capture stack trace
  }
}
