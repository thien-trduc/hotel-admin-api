import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DISCOUNT_DETAIL_COLLECTION } from 'src/schemas/constant';
import { DiscountDetail, DiscountDetailDocument } from 'src/schemas/discount-detail.schema';
import { MongoCoreService } from 'src/utils/core/abstract.mongo';

@Injectable()
export class DiscountDetailService extends MongoCoreService<DiscountDetail> {
    constructor(
        @InjectModel(DISCOUNT_DETAIL_COLLECTION) private discountDetailModel: Model<DiscountDetailDocument>
    ) {
        super(discountDetailModel);
    }

    async findWithDicount(): Promise<any> {
        return this.discountDetailModel.find().populate('discount').exec();
    }

    async findWithDicountByRoomRank(roomRank: string): Promise<any> {
        return this.discountDetailModel.find({roomRank}).populate('discount').exec();
    }
}
