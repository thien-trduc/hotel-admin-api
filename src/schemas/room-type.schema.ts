import { ROOM_TYPE_COLLECTION } from './constant';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type RoomTypeDocument = RoomType & Document;

@Schema({
    collection: ROOM_TYPE_COLLECTION,
    timestamps: true,
    versionKey: false,
})
export class RoomType {
    @ApiProperty({description: 'MAKP'})
    @Prop({ required: true, unique: true })
    typeCode: string;

    @ApiProperty({description: 'TENKIEUPHONG'})
    @Prop({ length: 20, required: true, unique: true })
    name: string;
}
export const RoomTypeSchema = SchemaFactory.createForClass(RoomType);