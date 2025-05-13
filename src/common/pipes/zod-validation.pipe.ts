import { Injectable, PipeTransform } from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';
import { ValidationException } from '../exceptions/bad-request.exception';

interface ValidationError {
  path: string;
  message: string;
}

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors: ValidationError[] = error.errors.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        }));

        throw new ValidationException(validationErrors);
      }
      throw error;
    }
  }
}
