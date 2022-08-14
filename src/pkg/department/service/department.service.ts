import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DEPARTMENT_COLLECTION } from 'src/schemas/constant';
import { Department, DepartmentDocument } from 'src/schemas/department.schema';
import { MongoCoreService } from 'src/utils/core/abstract.mongo';

@Injectable()
export class DepartmentService extends MongoCoreService<Department> {
    constructor(
        @InjectModel(DEPARTMENT_COLLECTION) model: Model<DepartmentDocument>
    ) {
        super(model)
    }
}