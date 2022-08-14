import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ROOM_TYPE_COLLECTION } from 'src/schemas/constant';
import { RoomType, RoomTypeDocument } from 'src/schemas/room-type.schema';
import { MongoCoreService } from 'src/utils/core/abstract.mongo';

@Injectable()
export class RoomTypeService  extends MongoCoreService<RoomType> {
    constructor(
        @InjectModel(ROOM_TYPE_COLLECTION) private roomTypeModel: Model<RoomTypeDocument>,
    ){
        super(roomTypeModel)
    }
}