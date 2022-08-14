import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtUserCustomerConfigService } from 'src/config/config.jwt-user-customer.service';
import { USER_CUSTOMER_COLLECTION } from 'src/schemas/constant';
import { UserCustomerSchema } from 'src/schemas/user-customer.schema';
import { CustomerModule } from '../customer/customer.module';
import { UserCustomerService } from './service/user-customer.service';
import { JwtCustomerStrategy } from './strategy/jwt-customer.strategy';
import { LocalCustomerStrategy } from './strategy/local-customer.strategy';
import { UserCustomerController } from './user-customer.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: USER_CUSTOMER_COLLECTION, schema: UserCustomerSchema },
        ]),
        PassportModule.register({ defaultStrategy: 'customer-jwt' }),
        JwtModule.registerAsync({
            useExisting: JwtUserCustomerConfigService,
        }),
        CustomerModule,
    ],
    controllers: [
        UserCustomerController,
    ],
    providers: [
        UserCustomerService,
        JwtCustomerStrategy,
        LocalCustomerStrategy,
    ],
    exports: [
        UserCustomerService,
    ],
})
export class UserCustomerModule { }
