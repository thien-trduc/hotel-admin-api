import { ROOM_CATEGORY_COLLECTION } from './constant';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type RoomCategoryDocument = RoomCategory & Document;

@Schema({
    collection: ROOM_CATEGORY_COLLECTION,
    timestamps: true,
    versionKey: false,
})
export class RoomCategory {
    @ApiProperty({ description: 'MALP' })
    @Prop({ required: true, unique: true })
    categoryCode: string;

    @ApiProperty({ description: 'TENLOAPHONG' })
    @Prop({ length: 20, required: true, unique: true })
    name: string;
}
export const RoomCategorySchema = SchemaFactory.createForClass(RoomCategory);