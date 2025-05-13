import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';
import { ROLE } from 'src/interface';
import { HandlePrismaError } from '../common/decorators/error-handler.decorator';
import { ResourceNotFoundException } from '../common/exceptions/not-found.exception';

@Injectable()
export class EmployeeService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.create({
      data: createEmployeeDto,
    });
  }

  async findAll(role?: ROLE) {
    if (role) {
      return this.databaseService.employee.findMany({
        where: {
          role: role,
        },
      });
    }

    return this.databaseService.employee.findMany();
  }

  async findOne(id: number) {
    const employee = await this.databaseService.employee.findUnique({
      where: {
        id: id,
      },
    });

    if (!employee) {
      throw new ResourceNotFoundException('Employee', id);
    }

    return employee;
  }

  @HandlePrismaError('Employee')
  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    // Check if employee exists first
    const existingEmployee = await this.databaseService.employee.findUnique({
      where: { id },
    });

    if (!existingEmployee) {
      throw new ResourceNotFoundException('Employee', id);
    }

    return this.databaseService.employee.update({
      where: {
        id: id,
      },
      data: updateEmployeeDto,
    });
  }

  @HandlePrismaError('Employee')
  async remove(id: number) {
    return this.databaseService.employee.delete({
      where: {
        id: id,
      },
    });
  }
}
