import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { ROLE } from 'src/interface';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { EmployeeService } from './employee.service';
import {
  createEmployeeSchema,
  updateEmployeeSchema,
} from './schemas/employee.schema';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(createEmployeeSchema))
    createEmployeeDto: Prisma.EmployeeCreateInput,
  ) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  findAll(@Query('role') role?: ROLE) {
    return this.employeeService.findAll(role || undefined);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateEmployeeSchema))
    updateEmployeeDto: Prisma.EmployeeUpdateInput,
  ) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
