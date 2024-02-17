// custom centalised error handling 
export class CustomError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;
    constructor(message: string, statusCode: number ) {
      super(message);
  
      // Ensure statusCode is within valid range
      if (statusCode < 400 || statusCode >= 500) {
        throw new RangeError('Invalid statusCode. Must be between 400 and 499.');
      }
  
      this.statusCode = statusCode;
      this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
      this.isOperational = true;
      Error.captureStackTrace(this, this.constructor); // Capture stack trace
    }
  }
  
  export default CustomError; // Optional for single default export
  