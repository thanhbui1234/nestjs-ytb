import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CheckEmailUniqueMiddleware } from '../common/middlewares/check-email-unique.middleware';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';

@Module({
  imports: [DatabaseModule],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckEmailUniqueMiddleware)
      .forRoutes({ path: 'employee', method: RequestMethod.POST });
  }
}
