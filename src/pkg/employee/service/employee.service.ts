import { Employee, EmployeeDocument } from './../../../schemas/employee.schema';
import { Injectable } from '@nestjs/common';
import { MongoCoreService } from 'src/utils/core/abstract.mongo';
import { EMPLOYEE_COLLECTION } from 'src/schemas/constant';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EmployeeService extends MongoCoreService<Employee> {
    constructor(
        @InjectModel(EMPLOYEE_COLLECTION) model: Model<EmployeeDocument>
    ) {
        super(model)
    }
}
