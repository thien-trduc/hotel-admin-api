import { RENTING_COLLECTION, RENTING_DETAIL_COLLECTION, ROOM_COLLECTION } from './constant';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Renting } from './renting.schema';
import { Room } from './room.schema';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type RentingDetailDocument = RentingDetail & Document;

@Schema({
  collection: RENTING_DETAIL_COLLECTION,
  timestamps: true,
  versionKey: false,
})
export class RentingDetail {
  @ApiProperty({ description: 'NGAYNHANPHONG' })
  @Prop({ required: true })
  checkInDate: Date;

  @ApiProperty({ description: 'NGAYTRAPHONG' })
  @Prop()
  checkOutDate: Date;

  @ApiProperty({ description: 'TRANGTHAITHANHTOAN' })
  @Prop()
  paymentStatus: boolean;

  @ApiProperty({ description: 'SOHOADON' })
  @Prop({ required: true })
  billNumber: string;

  @ApiProperty({ description: 'ID_PHIEUTHUE' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: RENTING_COLLECTION, required: true })
  renting: Types.ObjectId;

  @ApiProperty({ description: 'ID_PHONG' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: ROOM_COLLECTION, required: true })
  room: Types.ObjectId;
}
export const RentingDetailSchema = SchemaFactory.createForClass(RentingDetail);
