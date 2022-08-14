import { ROOM_RANK_PRICE_COLLECTION, ROOM_RANK_COLLECTION } from './constant';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { RoomRank } from './room-rank.schema';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export type RoomRankPriceDocument = RoomRankPrice & Document;

@Schema({
    collection: ROOM_RANK_PRICE_COLLECTION,
    timestamps: true,
    versionKey: false,
})
export class RoomRankPrice {
    @ApiProperty({ description: 'ID_HANG' })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: ROOM_RANK_COLLECTION, required: true })
    roomRank: Types.ObjectId;

    @ApiProperty({ description: 'NGAY' })
    @Prop({ required: true })
    date: Date;

    @ApiProperty({ description: 'GIA' })
    @Prop({ required: true })
    price: number;
}
export const RoomRankPriceSchema = SchemaFactory.createForClass(RoomRankPrice);
// RoomRankPriceSchema.index({ 'roomRank': 1, 'date': 1 }, { unique: true });
