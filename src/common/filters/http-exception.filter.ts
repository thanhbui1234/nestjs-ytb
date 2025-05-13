import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

interface ExceptionResponse {
  message: string;
  error?: string;
  details?: Record<string, unknown>;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    console.log(status, 'status');

    const exceptionResponse = exception.getResponse();

    // Handle validation errors
    if (status === 400 && typeof exceptionResponse === 'object') {
      return response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        ...exceptionResponse,
      });
    }

    // Handle not found errors
    if (status === 404) {
      return response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        ...(typeof exceptionResponse === 'object'
          ? exceptionResponse
          : {
              message: exception.message,
            }),
      });
    }

    // Handle other errors
    return response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message:
        typeof exceptionResponse === 'object'
          ? (exceptionResponse as ExceptionResponse).message ||
            exception.message
          : exception.message,
    });
  }
}
