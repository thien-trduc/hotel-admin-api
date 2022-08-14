import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DISCOUNT_COLLECTION } from 'src/schemas/constant';
import { Discount, DiscountDocument } from 'src/schemas/discount.schema';
import { MongoCoreService } from 'src/utils/core/abstract.mongo';

@Injectable()
export class DiscountService extends MongoCoreService<Discount> {
    constructor(
        @InjectModel(DISCOUNT_COLLECTION) private discountModel: Model<DiscountDocument>
    ) {
        super(discountModel);
    }
}
