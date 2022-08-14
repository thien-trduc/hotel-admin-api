import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
import { CUSTOMER_COLLECTION, CUSTOMER_DETAIL_COLLECTION, RENTING_DETAIL_COLLECTION } from './constant';

export type CustomerDetailDocument = CustomerDetail & Document;

@Schema({
  collection: CUSTOMER_DETAIL_COLLECTION,
  timestamps: true,
  versionKey: false,
})
export class CustomerDetail {
  @ApiProperty({ description: 'MAKH' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: CUSTOMER_COLLECTION, required: true })
  customer: Types.ObjectId;

  @ApiProperty({ description: 'ID_CTPT' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: RENTING_DETAIL_COLLECTION, required: true })
  rentingDetail: Types.ObjectId;
}
export const CustomerDetailSchema = SchemaFactory.createForClass(CustomerDetail);
