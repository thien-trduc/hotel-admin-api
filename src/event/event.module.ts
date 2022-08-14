import { Module } from '@nestjs/common';
import { BookingModule } from 'src/pkg/booking/booking.module';
import { CustomerModule } from 'src/pkg/customer/customer.module';
import { UserCustomerModule } from 'src/pkg/user-customer/user-customer.module';
import { EventService } from './event.service';

@Module({
  imports: [
    UserCustomerModule,
    CustomerModule,
    BookingModule,
  ],
  controllers: [],
  providers: [EventService]
})
export class EventModule {}
