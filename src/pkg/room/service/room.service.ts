import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ROOM_COLLECTION } from 'src/schemas/constant';
import { Room, RoomDocument } from 'src/schemas/room.schema';
import { MongoCoreService } from 'src/utils/core/abstract.mongo';
import { RoomStatusService } from './room-status.service';
import * as _ from 'lodash';
import { FindByDynamicQueryDto } from '../dto/find-by-dynamic-query.dto';
import { RoomRankService } from './room-rank.service';
import { RentingDetailService } from 'src/pkg/renting/service/renting-detail.service';
import { CustomerService } from 'src/pkg/customer/service/customer.service';
import { BookingService } from 'src/pkg/booking/service/booking.service';
import { BookingDetailService } from 'src/pkg/booking/service/booking-detail.service';
import { CustomerDetailService } from 'src/pkg/customer/service/customer-detail.service';
import { UpdateStatusRoomDto } from '../dto/update-status-room.dto';

@Injectable()
export class RoomService extends MongoCoreService<Room> {
  constructor(
    @InjectModel(ROOM_COLLECTION) private roomModel: Model<RoomDocument>,
    private readonly roomStatusService: RoomStatusService,
    private readonly roomRankService: RoomRankService,
    private readonly rentingDetailService: RentingDetailService,
    private readonly customerService: CustomerService,
    private readonly customerDetailService: CustomerDetailService,
    // private readonly bookingService: BookingService,
    // private readonly bookingDetailService: BookingDetailService,
  ) {
    super(roomModel);
  }

  async findByRoomRank(roomRank: string): Promise<Room[]> {
    try {
      return this.roomModel.find({ roomRank }).exec();
    } catch (error) {
      throw error;
    }
  }

  async findOneByRoomRankAlreadyBooking(roomRank: string): Promise<any> {
    try {
      const [roomStatus, roomRentingStatus] = await Promise.all([
        this.roomStatusService.findOneByStatusAsBooking(),
        this.getRoomStatus('RENTING'),
      ]);
      const res = await this.roomModel.findOne({ roomRank, roomStatus: roomStatus._id }).lean();
      await this.roomModel.findByIdAndUpdate(res._id, { roomStatus: roomRentingStatus })
      return res;
    } catch (error) {
      throw error;
    }
  }

  async countByRoomRank(roomRank: string): Promise<number> {
    try {
      return this.roomModel.countDocuments({ roomRank });
    } catch (error) {
      throw error;
    }
  }

  async countByRoomRankAndStatus(roomRank: string, status: string): Promise<number> {
    try {
      const roomStatus = await this.roomStatusService.findOne({ status });
      // console.log(await this.roomModel.find({ roomRank, status: roomStatus._id.toString() }))
      return this.roomModel.count({ roomRank, roomStatus: roomStatus._id.toString() });
    } catch (error) {
      throw error;
    }
  }

  async updateByRoomRankForBooking(roomRankId: string, quantity: number): Promise<any> {
    try {
      for (let i = 0; i < quantity; i++) {
        const [statusBooking, statusEmpty] = await this.roomStatusService.findByStatusAsBookingAndEmpty();
        const rooms = await this.roomModel.find({ roomRank: roomRankId, roomStatus: statusEmpty._id }).limit(1).exec();
        const room = _.first(rooms);
        await this.roomModel.findByIdAndUpdate(room._id, { roomStatus: statusBooking._id }).exec();
      }
    } catch (error) {
      throw error;
    }
  }

  async getRoomRankId(roomRank: string): Promise<any> {
    try {
      const roomRankId = await this.roomRankService.findOne({ name: `${roomRank}`.toUpperCase() });
      return roomRankId._id;
    } catch (error) {
      throw error;
    }
  }

  async getRoomStatus(roomStatus: string): Promise<any> {
    try {
      const roomStatusId = await this.roomStatusService.findOne({ status: `${roomStatus}`.toUpperCase() });
      return roomStatusId._id;
    } catch (error) {
      throw error;
    }
  }

  async findByDynamicQuery(dynamic: FindByDynamicQueryDto): Promise<any> {
    try {
      // Collect params query
      // const params: FindByDynamicQueryDto = {
      //   ...(dynamic?.roomRank && { roomRank: await this.getRoomRankId(dynamic.roomRank) }),
      //   ...(dynamic?.roomStatus && { roomStatus: await this.getRoomStatus(dynamic.roomStatus) }),
      //   ...(dynamic?.roomCode && { roomCode: dynamic.roomCode }),
      // };
      const params: FindByDynamicQueryDto = {
        ...(dynamic?.roomRank && { roomRank: dynamic.roomRank }),
        ...(dynamic?.roomStatus && { roomStatus: dynamic.roomStatus }),
        //...(dynamic?.roomCode && { roomCode: dynamic.roomCode }),
      };
      // Find all with query
      const rooms = await this.roomModel
        .find({ ...params })
        .populate({ path: 'roomStatus' })
        .populate({ path: 'roomRank' })
        .lean()
        .exec();
      let roomsResult: any;
      const roomStatus: any = {
        RENTING: 0,
        BOOKING: 0,
        EMPTY: 0,
        DIRTY: 0,
        REPAIRING: 0,
        CLEANING: 0,
        EXPIRED: 0,
      };
      // Calculate roomStatus quantity
      const roomStatusQuantity = rooms.map((element: any) => {
        // const validate = Object.keys(roomStatus).includes(element?.roomStatus?.status);
        const validate = element?.roomStatus?.status in roomStatus;
        if (validate) {
          roomStatus[element?.roomStatus?.status]++;
        }
        return roomStatus;
      });
      roomsResult = { statusQuantity: _.first(roomStatusQuantity), rooms };
      const dateCurrent = new Date();

      // Get all renting to day
      const rentingDetails = await this.rentingDetailService.getRentingDetailByDate(dateCurrent);
      if (rentingDetails?.length) {
        const roomsRentingResult = await Promise.all(roomsResult?.rooms.map(async (element: any) => {
          // Room Status never use
          const roomStatusUse = new Set(['RENTING', 'EXPIRED']);
          const roomId = element?._id;
          const status = `${element?.roomStatus?.status}`.toUpperCase();
          if (roomStatusUse.has(status)) {
            // Get customer in room
            const customerInRoom = _.find(rentingDetails, item => `${item.room}` === `${roomId}`);
            if (customerInRoom) {
              console.log(customerInRoom)
              const customerInfo = await this.getCustomerInfo(customerInRoom._id);
              return {
                ...element,
                customerInfo,
              };
            }
          }
          return element;
        }));
        roomsResult.rooms = roomsRentingResult;
      }
      return roomsResult;
    } catch (error) {
      throw error;
    }
  }

  async getCustomerInfo(rentingDetailId: string): Promise<any> {
    try {
      const customerDetail = await this.customerDetailService.getCustomerDetailByRenting(rentingDetailId);
      return {
        fullName: customerDetail.customer?.fullName,
        idCard: customerDetail.customer?.idCard,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateRoomForCheckOut(rooms: string[]): Promise<any> {
    try {
      console.log(rooms)
      const roomStatus = await this.getRoomStatus(`CLEANING`);
      await Promise.all(rooms.map(async room => {
        return this.roomModel.findByIdAndUpdate(`${room}`, { roomStatus });
      }))
    } catch (error) {
      throw error;
    }
  }

  async updateStatusRoom(formData: UpdateStatusRoomDto): Promise<any> {
    const { roomId, status } = formData;
    return this.roomModel.findByIdAndUpdate(roomId, { roomStatus: status })
  }
}
