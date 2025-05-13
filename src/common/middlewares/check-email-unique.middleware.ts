import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { DatabaseService } from '../../database/database.service';
import { DuplicateEmailException } from '../exceptions/bad-request.exception';

interface RequestWithEmail extends Request {
  body: {
    email?: string;
    [key: string]: any;
  };
}

@Injectable()
export class CheckEmailUniqueMiddleware implements NestMiddleware {
  constructor(private readonly databaseService: DatabaseService) {}

  async use(req: RequestWithEmail, res: Response, next: NextFunction) {
    const { email } = req.body;

    if (email) {
      const existingEmployee = await this.databaseService.employee.findUnique({
        where: { email },
      });

      if (existingEmployee) {
        throw new DuplicateEmailException(email);
      }
    }

    next();
  }
}
