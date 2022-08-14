import { Module } from '@nestjs/common';
import { EmployeeService } from './service/employee.service';
import { EmployeeController } from './employee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EMPLOYEE_COLLECTION } from 'src/schemas/constant';
import { EmployeeSchema } from 'src/schemas/employee.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EMPLOYEE_COLLECTION, schema: EmployeeSchema }
    ])
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService]
})
export class EmployeeModule {}
