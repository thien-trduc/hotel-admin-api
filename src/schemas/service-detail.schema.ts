import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
import { RENTING_DETAIL_COLLECTION, SERVICE_COLLECTION, SERVICE_DETAIL_COLLECTION } from './constant';

export type ServiceDetailDocument = ServiceDetail & Document;

@Schema({
  collection: SERVICE_DETAIL_COLLECTION,
  timestamps: true,
  versionKey: false,
})
export class ServiceDetail {
  @ApiProperty({ description: 'ID_CTPT' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: RENTING_DETAIL_COLLECTION, required: true })
  rentingDetail: Types.ObjectId;

  @ApiProperty({ description: 'ID_SERVICE' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: SERVICE_COLLECTION, required: true })
  service: Types.ObjectId;

  @ApiProperty({ description: 'NGAY' })
  @Prop({ required: true })
  date: Date;

  @ApiProperty({ description: 'SOLUONG' })
  @Prop()
  quantity: number;

  @ApiProperty({ description: 'DONGIA' })
  @Prop()
  price: number;

  @ApiProperty({ description: 'TRANGTHAITHANHTOAN' })
  @Prop()
  paymentStatus: boolean;

  @ApiProperty({ description: 'SOHOADON' })
  @Prop({ required: true })
  receiptCode: string;
}
export const ServiceDetailSchema = SchemaFactory.createForClass(ServiceDetail);
