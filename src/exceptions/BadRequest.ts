// handle client bad request exceptions

import { ErrorCodes, CustomError } from "./CustomError";
export class BadRequetError extends CustomError {
  constructor(message: string, errorCode: ErrorCodes) {
    super(message, errorCode, 400);
  }
}
