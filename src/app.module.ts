import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [UsersModule, DatabaseModule, EmployeeModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
