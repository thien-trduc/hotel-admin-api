import { ROOM_CATEGORY_COLLECTION, ROOM_RANK_COLLECTION, ROOM_TYPE_COLLECTION } from './constant';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { RoomType } from './room-type.schema';
import { RoomCategory } from './room-category.schema';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export type RoomRankDocument = RoomRank & Document;

@Schema({
    collection: ROOM_RANK_COLLECTION,
    timestamps: true,
    versionKey: false,
})
export class RoomRank {

    @ApiProperty({ description: 'TENHANG' })
    @Prop({ length: 30, required: true })
    name: string;

    @ApiProperty({ description: 'MOTA' })
    @Prop({ required: true })
    description: string;

    @ApiProperty({ description: 'HINHANH' })
    @Prop({ required: true })
    images: string[];

    @ApiProperty({ description: 'ID_LOAIPHONG' })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: ROOM_TYPE_COLLECTION, required: true})
    roomType: Types.ObjectId;

    @ApiProperty({ description: 'ID_KIEUPHONG' })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: ROOM_CATEGORY_COLLECTION, required: true})
    roomCategory: Types.ObjectId;
}
export const RoomRankSchema = SchemaFactory.createForClass(RoomRank);