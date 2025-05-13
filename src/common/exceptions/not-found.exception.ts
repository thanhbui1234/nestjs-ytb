import { NotFoundException } from '@nestjs/common';

export class ResourceNotFoundException extends NotFoundException {
  constructor(resource: string, id: number | string) {
    super({
      message: `${resource} not found`,
      error: 'Not Found',
      details: {
        resource,
        id,
        timestamp: new Date().toISOString(),
      },
    });
  }
}
