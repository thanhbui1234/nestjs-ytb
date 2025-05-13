import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [DatabaseModule, EmployeeModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
