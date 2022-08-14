import { EMPLOYEE_COLLECTION, RECEIPT_COLLECTION, RENTING_COLLECTION } from './constant';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Employee } from './employee.schema';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Renting } from './renting.schema';
import { genCode } from 'src/utils/utils';

export type ReceiptDocument = Receipt & Document;

@Schema({
  collection: RECEIPT_COLLECTION,
  timestamps: true,
  versionKey: false,
})
export class Receipt {
  @ApiProperty({ description: 'SOHOADON' })
  @Prop()
  receiptCode: string;

  @ApiProperty({ description: 'NGAY' })
  @Prop({ required: true })
  date: Date;

  @ApiProperty({ description: 'MASOTHUE' })
  @Prop({ length: 20 })
  taxCode: string;

  @ApiProperty({ description: 'HOTENNGUOITHANHTOAN' })
  @Prop({ length: 50, required: true })
  owner: string;

  @ApiProperty({ description: 'SOTIEN' })
  @Prop()
  totalPrice: number;

  @ApiProperty({ description: 'ID_NHANVIEN' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: EMPLOYEE_COLLECTION, required: true })
  employee: Types.ObjectId;

  @ApiProperty({ description: 'ID_PHIEUTHUE' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: RENTING_COLLECTION, required: true })
  renting: Types.ObjectId;
}
export const ReceiptSchema = SchemaFactory.createForClass(Receipt);
ReceiptSchema.pre<Receipt>('save', function (next) {
  const receipt: any = this;
  const owner = receipt.owner.toString().substring(0, 3);
  receipt.receiptCode = `HĐ${genCode()}`.replace('_', owner).replace(':','').replace('-','');
  next();
});