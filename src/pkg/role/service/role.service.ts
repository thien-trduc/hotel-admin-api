import { Model, Document } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { ROLE_COLLECTION } from 'src/schemas/constant';
import { Role, RoleDocument } from 'src/schemas/role.schema';
import { MongoCoreService } from 'src/utils/core/abstract.mongo';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RoleService extends MongoCoreService<Role> {
    constructor(
        @InjectModel(ROLE_COLLECTION) model: Model<RoleDocument>
    ) {
        super(model)
    }
}
