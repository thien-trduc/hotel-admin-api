import { MongoCoreService } from 'src/utils/core/abstract.mongo';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ROOM_RANK_PRICE_COLLECTION } from 'src/schemas/constant';
import { Model } from 'mongoose';
import { RoomRankPrice, RoomRankPriceDocument } from 'src/schemas/room-rank-rice.schema';

@Injectable()
export class RoomRankPriceService extends MongoCoreService<RoomRankPrice> {
    constructor(
        @InjectModel(ROOM_RANK_PRICE_COLLECTION) private roomRankPriceModel: Model<RoomRankPriceDocument>
    ) {
        super(roomRankPriceModel)
    }

    async findByRoomRank(roomRank: string): Promise<any> {
        return this.roomRankPriceModel
            .find({ roomRank })
            .sort({ createdAt: 'desc' })
            .exec();
    }
}
