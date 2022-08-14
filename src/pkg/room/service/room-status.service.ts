import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { ROOM_STATUS_COLLECTION } from 'src/schemas/constant';
import { RoomStatus, RoomStatusDocument } from 'src/schemas/room-status.schema';
import { MongoCoreService } from 'src/utils/core/abstract.mongo';
import { RoomStatusEnum } from '../enums/room-status.enum';

@Injectable()
export class RoomStatusService extends MongoCoreService<RoomStatus> {
  constructor(@InjectModel(ROOM_STATUS_COLLECTION) private roomStatusModel: Model<RoomStatusDocument>) {
    super(roomStatusModel);
  }

  async findByStatusAsBookingAndEmpty(): Promise<(RoomStatus & Document)[]> {
    return this.roomStatusModel
      .find({
        status: {
          $in: ['BOOKING', 'EMPTY'],
        },
      })
      .sort({ status: 'asc' })
      .exec();
  }

  async findOneByStatusAsBooking(): Promise<any> {
    try {
      return this.roomStatusModel.findOne({ status: RoomStatusEnum.BOOKING }).exec();
    } catch (error) {
      throw error;
    }
  }
}
