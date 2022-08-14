import { BOOKING_COLLECTION, CUSTOMER_COLLECTION } from './constant';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { genCode } from 'src/utils/utils';

export type BookingDocument = Booking & Document;

@Schema({
  collection: BOOKING_COLLECTION,
  timestamps: true,
  versionKey: false,
})
export class Booking {
  @ApiProperty()
  @Prop()
  bookingCode: string;

  @ApiProperty({ description: 'NGAYDAT' })
  @Prop()
  date: Date;

  @ApiProperty({ description: 'NGAYNHANPHONG' })
  @Prop()
  checkInDate: Date;

  @ApiProperty({ description: 'NGAYTRAPHONG' })
  @Prop()
  checkOutDate: Date;

  @ApiProperty({ description: 'SOTIENDATCOC' })
  @Prop()
  price: number;

  @ApiProperty({ description: 'TRANGTHAI' })
  @Prop({default: 0})
  status: number;

  @ApiProperty({ description: 'MAKH' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: CUSTOMER_COLLECTION, required: true })
  customer: Types.ObjectId;

  @ApiProperty({ description: 'GHICHU' })
  @Prop()
  description: string;
}
export const BookingSchema = SchemaFactory.createForClass(Booking);

BookingSchema.pre<Booking>('save', function (next) {
  const booking: Booking = this;
  const idCustomer = booking.customer.toString().substring(0, 3);
  booking.bookingCode = `PĐ${genCode()}`.replace('_', idCustomer).replace(':','');
  next();
});
