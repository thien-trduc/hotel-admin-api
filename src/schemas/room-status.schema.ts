import { ROOM_STATUS_COLLECTION } from './constant';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { RoomStatusEnum } from 'src/pkg/room/enums/room-status.enum';

export type RoomStatusDocument = RoomStatus & Document;
@Schema({
  collection: ROOM_STATUS_COLLECTION,
  timestamps: true,
  versionKey: false,
})
export class RoomStatus {
  @ApiProperty({ description: 'TRANGTHAI' })
  @Prop({ enum: RoomStatusEnum, required: true, unique: true })
  status: string;

  @ApiProperty({ description: 'MAU' })
  @Prop({ required: true, unique: true })
  color: string;
}
export const RoomStatusSchema = SchemaFactory.createForClass(RoomStatus);
