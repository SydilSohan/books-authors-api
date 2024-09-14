// extend default error class to support statuscodes, message and status etc
export class CustomError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  errorCode: ErrorCodes;
  constructor(message: string, statusCode: number, errorCode: ErrorCodes) {
    super(message);

    // Ensure statusCode is within valid range
    // if (statusCode < 400 || statusCo  de >= 600) {
    //   throw new Error(
    //     "Error status code must be within the range of 400 to 599"
    //   );
    // }
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
    this.isOperational = true;
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor); // Capture stack trace
  }
}

export enum ErrorCodes {
  //can be used to throw exceptions, prisma erros can be included here
  NOT_FOUND = 404,
  VALIDATION_ERROR = 400,
  PERMISSION_ERROR = 403,
  UPDATE_ERROR = 500,
  DELETE_ERROR = 500,
}
