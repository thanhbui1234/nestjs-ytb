import { BadRequestException } from '@nestjs/common';

export class ValidationException extends BadRequestException {
  constructor(errors: Array<{ path: string; message: string }>) {
    super({
      message: 'Validation failed',
      errors,
    });
  }
}

export class DuplicateEmailException extends BadRequestException {
  constructor(email: string) {
    super({
      message: 'Email already exists',
      errors: [
        {
          path: 'email',
          message: `Email ${email} is already registered`,
        },
      ],
    });
  }
}
