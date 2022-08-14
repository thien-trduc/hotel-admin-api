import { DISCOUNT_DETAIL_COLLECTION, ROOM_RANK_COLLECTION, DISCOUNT_COLLECTION } from './constant';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { RoomRank } from './room-rank.schema';
import { Discount } from './discount.schema';
import { ApiProperty } from '@nestjs/swagger';

export type DiscountDetailDocument = DiscountDetail & Document;
@Schema({
    collection: DISCOUNT_DETAIL_COLLECTION,
    timestamps: true,
    versionKey: false,
})
export class DiscountDetail {
    @ApiProperty({ description: 'ID_HANG' })
    @Prop({ ref: ROOM_RANK_COLLECTION, type: mongoose.Schema.Types.ObjectId, required: true })
    roomRank: Types.ObjectId;

    @ApiProperty({ description: 'ID_KHUYENMAI' })
    @Prop({ ref: DISCOUNT_COLLECTION, type: mongoose.Schema.Types.ObjectId, required: true })
    discount:  Types.ObjectId;

    @ApiProperty({ description: 'GIATRI' })
    @Prop()
    value: number;
}
export const DiscountDetailSchema = SchemaFactory.createForClass(DiscountDetail);