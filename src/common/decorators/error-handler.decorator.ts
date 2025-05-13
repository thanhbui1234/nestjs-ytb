import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ResourceNotFoundException } from '../exceptions/not-found.exception';

type MethodDecorator = (
  target: object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor,
) => PropertyDescriptor;

export function HandlePrismaError(resource: string): MethodDecorator {
  return function (
    target: object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor {
    const originalMethod = descriptor.value as (
      ...args: unknown[]
    ) => Promise<unknown>;

    descriptor.value = async function (...args: unknown[]): Promise<unknown> {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        console.log('Decorator: After method execution (error)', error);
        if (
          error instanceof PrismaClientKnownRequestError &&
          error.code === 'P2025'
        ) {
          const id = args[0];
          if (typeof id === 'number' || typeof id === 'string') {
            throw new ResourceNotFoundException(resource, id);
          }
        }
        throw error;
      }
    };

    return descriptor;
  };
}
