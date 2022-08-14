import { ROLE_COLLECTION } from './../../schemas/constant';
import { Module } from '@nestjs/common';
import { RoleService } from './service/role.service';
import { RoleController } from './role.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSchema } from 'src/schemas/role.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: ROLE_COLLECTION, schema: RoleSchema },
    ])
  ],
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule {}
