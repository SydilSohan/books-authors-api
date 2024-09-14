//errors for different scenarios,
//can be accommodated into one reusable class

import { CustomError, ErrorCodes } from "./CustomError";
export class NotFoundError extends CustomError {
  constructor() {
    super("Resource not found", 404, ErrorCodes.NOT_FOUND);
  }
}

interface ValidationErrorDetail {
  field: string;
  message: string;
}

export class ValidationError extends CustomError {
  details: ValidationErrorDetail[];

  constructor(details: ValidationErrorDetail[]) {
    super("Validation failed", 400, ErrorCodes.VALIDATION_ERROR);
    this.details = details;
  }
}

export class PermissionError extends CustomError {
  constructor() {
    super("Permission denied", 403, ErrorCodes.PERMISSION_ERROR);
  }
}

export class UpdateError extends CustomError {
  constructor() {
    super("Failed to update resource", 500, ErrorCodes.UPDATE_ERROR);
  }
}

export class DeleteError extends CustomError {
  constructor() {
    super("Failed to delete resource", 500, ErrorCodes.DELETE_ERROR);
  }
}
