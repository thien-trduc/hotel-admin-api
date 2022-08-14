import { forwardRef, HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Model } from 'mongoose';
import { RentingDetailService } from 'src/pkg/renting/service/renting-detail.service';
import { RentingService } from 'src/pkg/renting/service/renting.service';
import { RoomRankService } from 'src/pkg/room/service/room-rank.service';
import { RoomService } from 'src/pkg/room/service/room.service';
import { Booking, BookingDocument } from 'src/schemas/booking.schema';
import { BOOKING_COLLECTION } from 'src/schemas/constant';
import { MongoCoreService, Pagination } from 'src/utils/core/abstract.mongo';
import { ResponseDto } from 'src/utils/core/dto/response.dto';
import { CreateBookingOrderDto } from '../dto/create-booking-order.dto';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { BookingDetailService } from './booking-detail.service';
import { BookingOrderService } from './booking-order.service';
import * as _ from 'lodash';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TopicEvent } from 'src/event/constant';

@Injectable()
export class BookingService extends MongoCoreService<Booking> {
  private logger = new Logger(BookingService.name);

  constructor(
    @InjectModel(BOOKING_COLLECTION) private bookingModel: Model<BookingDocument>,
    private bookingOrderService: BookingOrderService,
    private bookingDetailService: BookingDetailService,
    private roomRankService: RoomRankService,
    @Inject(forwardRef(() => RoomService)) private roomService: RoomService,
    @Inject(forwardRef(() => RentingService)) private rentingService: RentingService,
    private rentingDetailService: RentingDetailService,
    private event: EventEmitter2,
  ) {
    super(bookingModel);
  }

  async reserveBooking(user: any, formData: CreateBookingDto): Promise<any> {
    try {
      const date = moment(formData.date).toDate();
      const checkInDate = moment(formData.checkInDate).toDate();
      const checkOutDate = moment(formData.checkOutDate).toDate();

      const bookingOrders = await this.bookingOrderService.findByUserId(user.userId);
      for (const bookingOrder of bookingOrders) {
        const { roomRank, quantity } = bookingOrder.toObject();
        const bookingRule = await this.checkBookingRule(roomRank, date, checkInDate, checkOutDate, quantity);
        if (!bookingRule) {
          throw new HttpException('Đã xảy ra lỗi khi đặt phòng! Xin thử lại sau!', 500);
        }
      }
      const bookingNew = await this.create({ ...formData });
      if (!bookingNew) {
        throw new HttpException('Đã xảy ra lỗi khi đặt phòng! Xin thử lại sau!', 500);
      }
      const bookingDetailsPromise = bookingOrders.map(async (bookingOrder) => {
        const { roomRank, quantity, price, totalPrice } = bookingOrder;
        return this.bookingDetailService.create({
          roomRank,
          quantity,
          price,
          totalPrice,
          booking: bookingNew._id,
        });
      });
      const bookingDetails = await Promise.all(bookingDetailsPromise);
      for (const bookingDetail of bookingDetails) {
        await this.roomService.updateByRoomRankForBooking(bookingDetail.roomRank._id.toString(), bookingDetail.quantity);
      }
      await this.bookingOrderService.removeByConditions({
        _id: {
          $in: [...bookingOrders.map((order) => order._id)],
        },
      });
      this.event.emit(TopicEvent.MAIL_BOOKING, {
        userId: user.userId,
        bookingId: bookingNew._id,
      });
    } catch (error) {
      throw error;
    }
  }

  async createBookingOrder(formData: CreateBookingOrderDto): Promise<any> {
    try {
      const bookingDate = moment(formData.bookingDate).toDate();
      const checkInDate = moment(formData.checkInDate).toDate();
      const checkOutDate = moment(formData.checkOutDate).toDate();
      const bookingRule = await this.checkBookingRule(
        formData.roomRank,
        bookingDate,
        checkInDate,
        checkOutDate,
        formData.quantity,
      );
      if (!bookingRule) {
        throw new HttpException('Đã xảy ra lỗi khi đặt phòng ! Xin thử lại sau '!, 500);
      }
      const { checkInDate: bbb, checkOutDate: aaa, bookingDate: ccc, ...data } = formData;
      return this.bookingOrderService.create({ ...data });
    } catch (error) {
      throw error;
    }
  }

  async checkBookingRule(roomRankId: any, bookingDate: Date, checkIn: Date, checkOut: Date, quantity: number): Promise<boolean> {
    let count = 0;
    let rule = false;
    const [roomCount, bookings, roomRepairCount, roomRank] = await Promise.all([
      this.roomService.countByRoomRank(roomRankId),
      this.bookingModel
        .find({
          checkOutDate: {
            $gte: bookingDate,
          },
        })
        .exec(),
      this.roomService.countByRoomRankAndStatus(roomRankId, 'REPAIRING'),
      this.roomRankService.findById(roomRankId),
    ]);
    if (bookings) {
      // this.logger.log(`roomCounts :` + roomCount);
      // this.logger.log(`bookings :` + bookings);
      const bookingIds = bookings.map(booking => booking._id);
      const [bookingDetails, rentings] = await Promise.all([
        this.bookingDetailService.findByBookings(bookingIds),
        this.rentingService.findByBookings(bookingIds),
      ]);
      this.logger.log(`bookingDetails :` + bookingDetails);
      if (bookingDetails) {
        for (const d = moment(checkIn); d.isBefore(checkOut); d.add(1, 'days')) {
          for (const bookingDetail of bookingDetails) {
            // const booking: Booking = bookingDetail.booking;
            const booking: Booking = await this.findById(`${bookingDetail.booking._id}`);
            if (moment(booking.checkOutDate).isAfter(d)) {
              count += bookingDetail.quantity;
            }
          }
        }
      }
      if (rentings) {
        const rentingIds = rentings.map(renting => renting._id);
        const rentingDetails = await this.rentingDetailService.findByRentings(rentingIds);
        if (rentingDetails) {
          for (const rentingDetail of rentingDetails) {
            const findBookingRent = rentings.find((rent) => rent._id.toString() === rentingDetail.renting.toString());
            if (moment(rentingDetail.checkOutDate).isBefore(findBookingRent.booking.checkOutDate)) {
              count--;
            }
          }
        }
      }
    }
    console.log(count, roomCount, roomRepairCount)
    const roomEmpty = roomCount - roomRepairCount - count;
    if (roomEmpty === 0) {
      throw new HttpException(`Hạng phòng ${roomRank.name} đã hết phòng trống`, 400);
    } else if (quantity > roomEmpty) {
      throw new HttpException(
        `Hạng phòng ${roomRank.name} chỉ còn ${roomEmpty} phòng trống`,
        400,
      );
    } else {
      rule = true;
    }
    return rule;
  }

  async findBookings(
    pagination: Pagination,
    query: any,
    sort: any,
  ): Promise<ResponseDto<Booking>> {
    try {
      const { pageIndex, pageSize } = pagination;
      let filter: any = {};
      let order: any = {};
      filter = !_.isEmpty(query) ? { ...filter, ...query } : filter;
      order = !_.isEmpty(sort) ? { ...order, ...sort } : { createdAt: 'desc' };
      const [rows, totalRows] = await Promise.all([
        this.model
          .find({ ...filter })
          .populate('customer')
          .skip(pageIndex * pageSize)
          .limit(pageSize)
          .sort({ ...order })
          .exec(),
        this.model.countDocuments(),
      ]);
      return {
        pageIndex,
        pageSize,
        rows,
        totalRows
      }
    } catch (error) {
      throw error;
    }
  }

  async searchBookings(pagination: Pagination,
    query: any,
    sort: any,): Promise<ResponseDto<Booking>> {
    try {
      const handleQuery = Object.entries(query).map(([key, value]) => {
        return { [key]: { $regex: '.*' + value + '.*' } };
      })
      const { pageIndex, pageSize } = pagination;
      let order: any = {};
      order = sort ? { ...order, ...sort } : { createdAt: 'desc' };

      const [rows, totalRows] = await Promise.all([
        this.model
          .find(_.first(handleQuery))
          .skip(pageIndex * pageSize)
          .populate('customer')
          .limit(pageSize)
          .sort({ ...order })
          .exec(),
        this.model.countDocuments(),
      ])
      return {
        pageIndex,
        pageSize,
        rows,
        totalRows
      }
    } catch (error) {
      throw error;
    }
  }

  async getBookingsByDate(date: Date): Promise<any> {
    return this.bookingModel.find({ dateCheckIn: { $gte: date }, dateCheckOut: { $lte: date } }).populate('customer').exec();
  }

  async findByIdBooking(id: string): Promise<any> {
    try {
      const [booking, bookingDetails] = await Promise.all([
        this.bookingModel.findById(id).populate('customer').lean(),
        this.bookingDetailService.findByBooking(id),
      ])
      return {
        ...booking,
        details: bookingDetails,
      }
    } catch (error) {
      throw error;
    }
  }

  async updateBookingStatusAfterCheckIn(id: string): Promise<any> {
    return this.bookingModel.findByIdAndUpdate(id, { status: 1 }).exec();
  }

  async findByBetweenDate(start: Date, end: Date): Promise<any> {
    return this.bookingModel.find({
      date: {
        $gte: start,
        $lt: end,
      }
    }).exec();
  }
}
