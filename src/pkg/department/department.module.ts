import { DEPARTMENT_COLLECTION } from './../../schemas/constant';
import { Module } from '@nestjs/common';
import { DepartmentService } from './service/department.service';
import { DepartmentController } from './department.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentSchema } from '../../schemas/department.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DEPARTMENT_COLLECTION, schema: DepartmentSchema }
    ]),
  ],
  controllers: [DepartmentController],
  providers: [DepartmentService]
})
export class DepartmentModule {}
