import { ROOM_COLLECTION, ROOM_RANK_COLLECTION, ROOM_STATUS_COLLECTION } from './constant';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { RoomRank } from './room-rank.schema';
import * as mongoose from 'mongoose';
import { RoomStatus } from './room-status.schema';
import { ApiProperty } from '@nestjs/swagger';

export type RoomDocument = Room & Document;

@Schema({
  collection: ROOM_COLLECTION,
  timestamps: true,
  versionKey: false,
})
export class Room {
  @ApiProperty({ description: 'MAPHONG' })
  @Prop()
  roomCode: string;

  @ApiProperty({ description: 'MOTA' })
  @Prop({ length: 200 })
  description: string;

  @ApiProperty({ description: 'HANGPHONG' })
  @Prop({ ref: ROOM_RANK_COLLECTION, type: mongoose.Schema.Types.ObjectId, required: true })
  roomRank: Types.ObjectId;

  @ApiProperty({ description: 'TRANGTHAIPHONG' })
  @Prop({ ref: ROOM_STATUS_COLLECTION, type: mongoose.Schema.Types.ObjectId, required: true })
  roomStatus: Types.ObjectId;
}
export const RoomSchema = SchemaFactory.createForClass(Room);
