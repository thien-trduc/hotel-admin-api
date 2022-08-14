import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ROOM_CATEGORY_COLLECTION } from 'src/schemas/constant';
import { RoomCategory, RoomCategoryDocument } from 'src/schemas/room-category.schema';
import { MongoCoreService } from 'src/utils/core/abstract.mongo';

@Injectable()
export class RoomCategoryService  extends MongoCoreService<RoomCategory> {
    constructor(
        @InjectModel(ROOM_CATEGORY_COLLECTION) private roomCategoryModel: Model<RoomCategoryDocument>,
    ){
        super(roomCategoryModel)
    }
}