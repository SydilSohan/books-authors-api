"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
// custom centalised error handling
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        // Ensure statusCode is within valid range
        if (statusCode < 400 || statusCode >= 500) {
            throw new RangeError("Invalid statusCode. Must be between 400 and 499.");
        }
        this.statusCode = statusCode;
        this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor); // Capture stack trace
    }
}
exports.CustomError = CustomError;
exports.default = CustomError; // Optional for single default export
//   // src/utils/CustomError.ts
// export class CustomError extends Error {
//   statusCode: number;
//   constructor(message: string, statusCode: number) {
//     super(message);
//     this.statusCode = statusCode;
//     Error.captureStackTrace(this, this.constructor);
//   }
// }
