import {
  CUSTOMER_DETAIL_COLLECTION,
  RECEIPT_COLLECTION,
  RENTING_COLLECTION,
  RENTING_DETAIL_COLLECTION,
  SERVICE_DETAIL_COLLECTION,
} from './../../schemas/constant';
import { forwardRef, Module } from '@nestjs/common';
import { RentingService } from './service/renting.service';
import { RentingController } from './renting.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RentingSchema } from 'src/schemas/renting.schema';
import { RentingDetailSchema } from 'src/schemas/renting-detail.schema';
import { RentingDetailService } from './service/renting-detail.service';
import { ReceiptSchema } from 'src/schemas/receipt.schema';
import { CustomerDetailSchema } from 'src/schemas/customer-detail.schema';
import { CustomerModule } from '../customer/customer.module';
import { RoomModule } from '../room/room.module';
import { BookingModule } from '../booking/booking.module';
import { ServiceDetailSchema } from 'src/schemas/service-detail.schema';
import { ReceiptModule } from '../receipt/receipt.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RENTING_COLLECTION, schema: RentingSchema },
      { name: RENTING_DETAIL_COLLECTION, schema: RentingDetailSchema },
    ]),
    CustomerModule,
    RoomModule,
    ReceiptModule,
    forwardRef(() => BookingModule),
  ],
  controllers: [RentingController],
  providers: [RentingService, RentingDetailService],
  exports: [RentingService, RentingDetailService],
})
export class RentingModule {}
