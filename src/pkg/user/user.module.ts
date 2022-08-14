import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtUserEmployeeConfigService } from 'src/config/config.jwt-user-employee.service';
import { USER_EMPLOYEE_COLLECTION } from 'src/schemas/constant';
import { UserEmployeeSchema } from 'src/schemas/user-employee.schema';

import { UserEmployeeController } from './controller/user-employee.controller';
import { UserEmployeeService } from './service/user-employee.service';
import { JwtEmployeeStrategy } from './strategy/jwt-employee.strategy';
import { LocalEmployeeStrategy } from './strategy/local-employee.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: USER_EMPLOYEE_COLLECTION, schema: UserEmployeeSchema },
    ]),
    PassportModule.register({ defaultStrategy: 'employee-jwt' }),

    JwtModule.registerAsync({
      useExisting: JwtUserEmployeeConfigService,
  }),
  ],
  controllers: [
    UserEmployeeController,
  ],
  providers: [
    UserEmployeeService,
    JwtEmployeeStrategy,
    LocalEmployeeStrategy
  ]
})
export class UserModule { }
