import {
  ROOM_COLLECTION,
  ROOM_CATEGORY_COLLECTION,
  ROOM_TYPE_COLLECTION,
  ROOM_RANK_COLLECTION,
  ROOM_RANK_PRICE_COLLECTION,
  ROOM_STATUS_COLLECTION,
  DISCOUNT_DETAIL_COLLECTION,
} from './../../schemas/constant';
import { forwardRef, Module } from '@nestjs/common';
import { RoomService } from './service/room.service';
import { RoomController } from './controller/room.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomCategorySchema } from 'src/schemas/room-category.schema';
import { RoomTypeSchema } from 'src/schemas/room-type.schema';
import { RoomRankSchema } from 'src/schemas/room-rank.schema';
import { RoomSchema } from 'src/schemas/room.schema';
import { RoomRankPriceSchema } from 'src/schemas/room-rank-rice.schema';
import { RoomStatusSchema } from 'src/schemas/room-status.schema';
import { RoomStatusService } from './service/room-status.service';
import { RoomStatusController } from './controller/room-status.controller';
import { RoomTypeController } from './controller/room-type.controller';
import { RoomTypeService } from './service/room-type.service';
import { RoomCategoryController } from './controller/room-category.controller';
import { RoomRankService } from './service/room-rank.service';
import { RoomRankController } from './controller/room-rank.controller';
import { RoomCategoryService } from './service/room-category.service';
import { RoomRankPriceService } from './service/room-rank-price.service';
import { DiscountDetailSchema } from 'src/schemas/discount-detail.schema';
import { RentingModule } from '../renting/renting.module';
import { CustomerModule } from '../customer/customer.module';
import { BookingModule } from '../booking/booking.module';
import { DiscountModule } from '../discount/discount.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ROOM_COLLECTION, schema: RoomSchema },
      { name: ROOM_CATEGORY_COLLECTION, schema: RoomCategorySchema },
      { name: ROOM_TYPE_COLLECTION, schema: RoomTypeSchema },
      { name: ROOM_RANK_COLLECTION, schema: RoomRankSchema },
      { name: ROOM_RANK_PRICE_COLLECTION, schema: RoomRankPriceSchema },
      { name: ROOM_STATUS_COLLECTION, schema: RoomStatusSchema },
    ]),
    forwardRef(() => RentingModule),
    forwardRef(() => BookingModule),
    CustomerModule,
    DiscountModule,
  ],
  controllers: [RoomController, RoomStatusController, RoomTypeController, RoomCategoryController, RoomRankController],
  providers: [
    RoomService,
    RoomStatusService,
    RoomTypeService,
    RoomCategoryService,
    RoomRankService,
    RoomRankPriceService,
  ],
  exports: [
    RoomService,
    RoomStatusService,
    RoomTypeService,
    RoomCategoryService,
    RoomRankService,
    RoomRankPriceService,
  ],
})
export class RoomModule {}
