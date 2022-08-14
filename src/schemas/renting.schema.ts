import { BOOKING_COLLECTION, EMPLOYEE_COLLECTION, RENTING_COLLECTION } from './constant';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Employee } from './employee.schema';
import * as mongoose from 'mongoose';
import { Booking } from './booking.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { genCode } from 'src/utils/utils';

export type RentingDocument = Renting & Document;

@Schema({
  collection: RENTING_COLLECTION,
  timestamps: true,
  versionKey: false,
})
export class Renting {
  @ApiProperty({ description: 'ID_NHANVIEN' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: EMPLOYEE_COLLECTION, required: true })
  employee: Types.ObjectId;

  @ApiProperty({ description: 'ID_PHIEUDAT' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: BOOKING_COLLECTION })
  booking: Types.ObjectId;

  @ApiProperty({ description: 'TONGTIEN' })
  @Prop({ required: true })
  totalPrice: number;

  @ApiProperty({ description: 'TONGGIAM' })
  @Prop()
  totalDiscount: number;

  @ApiProperty({ description: 'TRIGIAGIAM' })
  @Prop()
  valueDiscount: number;

  @ApiProperty()
  @Prop()
  rentingCode: string;

  @ApiProperty()
  @Prop({default: 0})
  status: number;
}
export const RentingSchema = SchemaFactory.createForClass(Renting);
RentingSchema.pre<Renting>('save', function (next) {
  const reting: any = this;
  const owner = `${reting.booking}`.substring(2, 5);
  reting.rentingCode = `PT${genCode()}`.replace('_', owner).replace(':','').replace('-','');
  next();
});