import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
import { BOOKING_COLLECTION, BOOKING_DETAIL_COLLECTION, ROOM_RANK_COLLECTION } from './constant';

export type BookingDetailDocument = BookingDetail & Document;

@Schema({
  collection: BOOKING_DETAIL_COLLECTION,
  timestamps: true,
  versionKey: false,
})
export class BookingDetail {
  @ApiProperty({ description: 'ID_HANG' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: ROOM_RANK_COLLECTION, required: true })
  roomRank: Types.ObjectId;

  @ApiProperty({ description: 'ID_PHIEUDAT' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: BOOKING_COLLECTION, required: true })
  booking: Types.ObjectId;

  @ApiProperty({ description: 'SOLUONG' })
  @Prop({ required: true })
  quantity: number;

  @ApiProperty({ description: 'DONGIA' })
  @Prop({ required: true })
  price: number;

  @ApiProperty({ description: 'THANHTIEN' })
  @Prop({ required: true })
  totalPrice: number;
}
export const BookingDetailSchema = SchemaFactory.createForClass(BookingDetail);
