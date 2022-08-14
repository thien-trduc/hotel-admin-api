import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { ConfigsModule } from './config/config.module';
import { ConfigMongoService } from './config/config.mongo.service';
import { EventModule } from './event/event.module';
import { BookingModule } from './pkg/booking/booking.module';
import { CustomerModule } from './pkg/customer/customer.module';
import { DepartmentModule } from './pkg/department/department.module';
import { DiscountModule } from './pkg/discount/discount.module';
import { EmployeeModule } from './pkg/employee/employee.module';
import { RentingModule } from './pkg/renting/renting.module';
import { RoleModule } from './pkg/role/role.module';
import { RoomModule } from './pkg/room/room.module';
import { ServiceMongoModule } from './pkg/service-mongo/service-mongo.module';
import { UserModule } from './pkg/user/user.module';
import { CloudinaryModule } from './utils/cloudinary/cloudinary.module';
import { UserCustomerModule } from './pkg/user-customer/user-customer.module';
import { SendgridMailModule } from './config/sendgridConnection';
import { SendgridConfigService } from './config/config.sendgrid.sevice';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ReceiptModule } from './pkg/receipt/receipt.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigsModule,
    MongooseModule.forRootAsync({
      imports: [ConfigsModule],
      useExisting: ConfigMongoService,
    }),
    SendgridMailModule.registerAsync({
      useExisting: SendgridConfigService,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    EventEmitterModule.forRoot(),
    EventModule,
    BookingModule,
    RoomModule,
    CustomerModule,
    DepartmentModule,
    DiscountModule,
    EmployeeModule,
    RentingModule,
    RoleModule,
    UserModule,
    ServiceMongoModule,
    CloudinaryModule,
    UserCustomerModule,
    ReceiptModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
