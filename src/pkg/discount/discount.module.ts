import { Module } from '@nestjs/common';
import { DiscountService } from './service/discount.service';
import { DiscountController } from './discount.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DISCOUNT_COLLECTION, DISCOUNT_DETAIL_COLLECTION } from 'src/schemas/constant';
import { DiscountSchema } from 'src/schemas/discount.schema';
import { DiscountDetailSchema } from 'src/schemas/discount-detail.schema';
import { DiscountDetailService } from './service/discount-detail.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DISCOUNT_COLLECTION, schema: DiscountSchema },
      { name: DISCOUNT_DETAIL_COLLECTION, schema: DiscountDetailSchema }
    ]),
  ],
  controllers: [DiscountController],
  providers: [DiscountService, DiscountDetailService],
  exports: [DiscountService, DiscountDetailService]
})
export class DiscountModule { }
