import { RentingModule } from './../renting/renting.module';
import { Module } from '@nestjs/common';
import { BookingService } from './service/booking.service';
import { BookingController } from './controller/booking.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BOOKING_COLLECTION,
  BOOKING_DETAIL_COLLECTION,
  BOOKING_ORDER_COLLECTION,
  USER_CUSTOMER_COLLECTION,
} from '../../schemas/constant';
import { BookingDetailSchema } from '../../schemas/booking-detail.schema';
import { BookingSchema } from '../../schemas/booking.schema';
import { RoomModule } from '../room/room.module';
import { BookingOrderSchema } from 'src/schemas/booking-order.schema';
import { BookingOrderService } from './service/booking-order.service';
import { BookingDetailService } from './service/booking-detail.service';
import { BookingOrderController } from './controller/booking-order.controller';
import { UserCustomerSchema } from 'src/schemas/user-customer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BOOKING_COLLECTION, schema: BookingSchema },
      { name: BOOKING_DETAIL_COLLECTION, schema: BookingDetailSchema },
      { name: BOOKING_ORDER_COLLECTION, schema: BookingOrderSchema },
      { name: USER_CUSTOMER_COLLECTION, schema: UserCustomerSchema },
    ]),
    RoomModule,
    RentingModule,
  ],
  controllers: [BookingController, BookingOrderController],
  providers: [BookingOrderService, BookingDetailService, BookingService],
  exports: [BookingService, BookingOrderService, BookingDetailService],
})
export class BookingModule {}
