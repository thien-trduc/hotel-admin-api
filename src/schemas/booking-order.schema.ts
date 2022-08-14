import { BOOKING_COLLECTION, BOOKING_ORDER_COLLECTION, CUSTOMER_COLLECTION, ROOM_RANK_COLLECTION, USER_CUSTOMER_COLLECTION } from './constant';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { RoomRank } from './room-rank.schema';
import { Booking } from './booking.schema';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { UserCustomer } from './user-customer.schema';
import { Customer } from './customer.schema';


export type BookingOrderDocument = BookingOrder & Document;

@Schema({
    collection: BOOKING_ORDER_COLLECTION,
    timestamps: true,
    versionKey: false,
})
export class BookingOrder {

    @ApiProperty({description: 'ID_HANGPHONG'})
    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: ROOM_RANK_COLLECTION})
    roomRank: Types.ObjectId;

    @ApiProperty({description: 'SOLUONG'})
    @Prop({required: true})
    quantity: number;

    @ApiProperty({description: 'DONGIA'})
    @Prop({required: true})
    price: number;

    @ApiProperty({description: 'THANHTIEN'})
    @Prop({required: true})
    totalPrice: number;

    @ApiProperty({description: 'ID_USER_KH'})
    @Prop({required: true,type: mongoose.Schema.Types.ObjectId, ref: USER_CUSTOMER_COLLECTION})
    user: Types.ObjectId;

    @ApiProperty({description: 'ID_KH'})
    @Prop({required: true,type: mongoose.Schema.Types.ObjectId, ref: CUSTOMER_COLLECTION})
    customer: Types.ObjectId;

}
export const BookingOrderSchema = SchemaFactory.createForClass(BookingOrder);