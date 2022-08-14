import { CUSTOMER_COLLECTION } from './constant';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type CustomerDocument = Customer & Document;

@Schema({
    collection: CUSTOMER_COLLECTION,
    timestamps: true,
    versionKey: false,
})
export class Customer {

    @ApiProperty({ description: 'CMND' })
    @Prop({ length: 20,required: true })
    idCard: string;

    @ApiProperty({ description: 'TENKH' })
    @Prop({ length: 50, required: true })
    fullName: string;

    @ApiProperty({ description: 'SDT' })
    @Prop({ length: 15 })
    phone: string;

    @ApiProperty({ description: 'DIACHI' })
    @Prop({ length: 100 })
    address: string;

    @ApiProperty({ description: 'EMAIL' })
    @Prop({ length: 100 })
    email: string;
}
export const CustomerSchema = SchemaFactory.createForClass(Customer);