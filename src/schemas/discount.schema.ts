import { DISCOUNT_COLLECTION } from './constant';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type DiscountDocument = Discount & Document;

@Schema({
    collection: DISCOUNT_COLLECTION,
    timestamps: true,
    versionKey: false,
})
export class Discount {
    @ApiProperty({ description: 'TEN' })
    @Prop()
    name: string;
    @ApiProperty({ description: 'NGAYBATDAU' })
    @Prop()
    startDate: Date;
    @ApiProperty({ description: 'NGAYKETTHUC' })
    @Prop()
    endDate: Date;
}
export const DiscountSchema = SchemaFactory.createForClass(Discount);