// errors/NotFoundError.ts
import { CustomError } from "./CustomError";
import { ValidationError as JoiValidationError } from "joi";
export class NotFoundError extends CustomError {
  constructor() {
    super("Resource not found", 404);
  }
}

// errors/ValidationError.ts

interface ValidationErrorDetail {
  field: string;
  message: string;
}

export class ValidationError extends CustomError {
  details: ValidationErrorDetail[];

  constructor(details: ValidationErrorDetail[]) {
    super("Validation failed", 400);
    this.details = details;
  }
}
// errors/PermissionError.ts

export class PermissionError extends CustomError {
  constructor() {
    super("Permission denied", 403);
  }
}

// errors/UpdateError.ts

export class UpdateError extends CustomError {
  constructor() {
    super("Failed to update resource", 500);
  }
}

// errors/DeleteError.ts

export class DeleteError extends CustomError {
  constructor() {
    super("Failed to delete resource", 500);
  }
}
