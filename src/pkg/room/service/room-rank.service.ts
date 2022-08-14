import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Document, Model } from 'mongoose';
import { BookingDetailService } from 'src/pkg/booking/service/booking-detail.service';
import { BookingService } from 'src/pkg/booking/service/booking.service';
import { DiscountDetailService } from 'src/pkg/discount/service/discount-detail.service';
import { ROOM_RANK_COLLECTION } from 'src/schemas/constant';
import { RoomRank, RoomRankDocument } from 'src/schemas/room-rank.schema';
import { MongoCoreService } from 'src/utils/core/abstract.mongo';
import { RequestDto } from 'src/utils/core/dto/request.dto';
import { currencyFormat, currentDate, dateFormat, dateWithOutTimeFormat } from 'src/utils/utils';
import { StatisticalRoomRankByDateDto } from '../dto/statistical-room-rank-by-date.dto';

import { RoomRankPriceService } from './room-rank-price.service';

@Injectable()
export class RoomRankService extends MongoCoreService<RoomRank> {
  constructor(
    @InjectModel(ROOM_RANK_COLLECTION) private roomRankModel: Model<RoomRankDocument>,
    private discoutDetailService: DiscountDetailService,
    private roomRankPriceService: RoomRankPriceService,
    @Inject(forwardRef(() => BookingService)) private bookingService: BookingService,
    private bookingDetailService: BookingDetailService,
  ) {
    super(roomRankModel);
  }

  async findWithPrice(formData: RequestDto): Promise<any> {
    const { pagination, query, sort } = formData;
    const result = await this.find(pagination, query, sort);
    const { rows, ...data } = result;
    let newRows: any;
    if (rows && rows.length) {
      const roomRankWithPricePromise = rows.map(async (roomRank: RoomRank & Document) => {
        return this.getPriceService(roomRank);
      });
      const roomWithPrice = await Promise.all(roomRankWithPricePromise);
      newRows = roomWithPrice;
    }
    return {
      ...data,
      rows: newRows,
    };
  }

  async searchWithPrice(formData: RequestDto): Promise<any> {
    const { pagination, query, sort } = formData;
    const result = await this.search(pagination, query, sort);
    const { rows, ...data } = result;
    let newRows: any;
    if (rows && rows.length) {
      const roomRankWithPricePromise = rows.map(async (roomRank: RoomRank & Document) => {
        return this.getPriceService(roomRank);
      });
      const roomWithPrice = await Promise.all(roomRankWithPricePromise);
      newRows = roomWithPrice;
    }
    return {
      ...data,
      rows: newRows,
    };
  }

  async getPriceService(roomRank: RoomRank & Document): Promise<any> {
    const priceServices = await this.roomRankPriceService.findByRoomRank(`${roomRank._id}`)
    const priceService = _.first(priceServices);
    const price = priceService?.price || 0;
    return {
      ...roomRank.toObject(),
      price,
      priceText: `${currencyFormat(price)} VNĐ`,
      dateText: dateFormat(priceService?.date),
    };
  }

  async getRoomRankDiscountBooking(formData: RequestDto): Promise<any> {
    try {
      let totalRows = 0;
      let roomRankWithDiscount: any[] = [];
      let discountDetailsHandler: any[] = [];
      const { pagination } = formData;
      const { pageIndex = 0, pageSize = 5 } = pagination;
      const roomRankDiscountDetails = await this.discoutDetailService.findWithDicount();
      if (roomRankDiscountDetails) {
        const currentDateBooking = currentDate();
        for (const discountDetail of roomRankDiscountDetails) {
          const { startDate, endDate } = discountDetail.discount;
          if (currentDateBooking.isAfter(startDate) && currentDateBooking.isBefore(endDate)) {
            discountDetailsHandler = [...discountDetailsHandler, discountDetail];
          }
        }
      }
      if (discountDetailsHandler.length) {
        const query = {
          _id: {
            $in: [...discountDetailsHandler.map((detail) => detail.roomRank)],
          },
        };
        const [rows, total] = await Promise.all([
          this.roomRankModel
            .find({ ...query })
            .populate('roomType')
            .populate('roomCategory')
            .skip(pageIndex * pageSize)
            .limit(pageSize)
            .sort({ createdAt: 'desc' })
            .exec(),
          this.roomRankModel.countDocuments({ ...query }),
        ]);
        totalRows = total;
        const roomRankWithPricePromise = rows.map(async (roomRank: RoomRank & Document) => {
          return this.getPriceService(roomRank);
        });
        const roomWithPrice = await Promise.all(roomRankWithPricePromise);
        roomRankWithDiscount = roomWithPrice.map((roomRank) => {
          const discountDetail = discountDetailsHandler.find(
            (detail) => detail.roomRank.toString() === roomRank._id.toString(),
          );
          const { price, ...data } = roomRank;
          const value = discountDetail?.value || 1;
          const priceDiscount = price * value;
          const currentPrice = price - priceDiscount;
          data.priceText = currencyFormat(currentPrice);
          return {
            ...data,
            discount: discountDetail.discount,
            price: currentPrice,
            priceDiscount: price,
            priceDiscountText: currencyFormat(price),
            isDiscount: true,
            discountValue: discountDetail.value * 100,
          };
        });
      }
      return {
        pageIndex,
        pageSize,
        totalRows,
        rows: roomRankWithDiscount,
      };
    } catch (error) {
      throw error;
    }
  }

  async getRoomRankBooking(formData: RequestDto): Promise<any> {
    try {
      let totalRows = 0;
      let roomRankWithDiscount: any[] = [];
      let roomRankDiscountIds: any[] = [];
      const { pagination } = formData;
      const { pageIndex = 0, pageSize = 5 } = pagination;
      const roomRankDiscountDetails = await this.discoutDetailService.findWithDicount();
      if (roomRankDiscountDetails) {
        const currentDateBooking = currentDate();
        for (const discountDetail of roomRankDiscountDetails) {
          const { startDate, endDate } = discountDetail.discount;
          if (currentDateBooking.isAfter(startDate) && currentDateBooking.isBefore(endDate)) {
            roomRankDiscountIds = [...roomRankDiscountIds, discountDetail.roomRank];
          }
        }
      }
      if (roomRankDiscountIds.length) {
        const query = {
          _id: {
            $nin: [...roomRankDiscountIds],
          },
        };
        const [rows, total] = await Promise.all([
          this.roomRankModel
            .find({ ...query })
            .populate('roomType')
            .populate('roomCategory')
            .skip(pageIndex * pageSize)
            .limit(pageSize)
            .sort({ createdAt: 'desc' })
            .exec(),
          this.roomRankModel.countDocuments({ ...query }),
        ]);
        totalRows = total;
        const roomRankWithPricePromise = rows.map(async (roomRank: RoomRank & Document) => {
          return this.getPriceService(roomRank);
        });
        const roomWithPrice = await Promise.all(roomRankWithPricePromise);
        roomRankWithDiscount = roomWithPrice.map((roomRank) => {
          return {
            ...roomRank,
            isDiscount: false,
          };
        });
      }
      return {
        pageIndex,
        pageSize,
        totalRows,
        rows: roomRankWithDiscount,
      };
    } catch (error) {
      throw error;
    }
  }

  async getRoomRankAndDiscountBooking(): Promise<any> {
    try {
      const formData = {
        pagination: {
          pageIndex: 0,
          pageSize: 100000,
        },
        query: {},
        sort: {},
      };
      const [roomRanksDiscount, roomRanks] = await Promise.all([
        this.getRoomRankDiscountBooking(formData),
        this.getRoomRankBooking(formData),
      ]);
      return [...roomRanksDiscount.rows, ...roomRanks.rows];
    } catch (error) {
      throw error;
    }
  }

  async getByIdWithPrice(id: string): Promise<any> {
    try {
      let roomRankWithPrice: any = {};
      const roomRank = await this.model.findById(id).exec();
      if (roomRank) {
        roomRankWithPrice = await this.getPriceService(roomRank);
        const discountRoomRanks = await this.discoutDetailService.findWithDicountByRoomRank(id);
        if (discountRoomRanks && discountRoomRanks.length) {
          const discountDetail = _.first(discountRoomRanks).toObject();
          const { price, ...data } = roomRankWithPrice;
          const value = discountDetail?.value || 1;
          const priceDiscount = price * value;
          const currentPrice = price - priceDiscount;
          data.priceText = currencyFormat(currentPrice);
          return {
            ...data,
            discount: discountDetail.discount,
            price: currentPrice,
            priceDiscount: price,
            priceDiscountText: currencyFormat(price),
            isDiscount: true,
            discountValue: discountDetail.value * 100,
          };
        }
      }
      return roomRankWithPrice;
    } catch (error) {
      throw error;
    }
  }

  async statisticalRoomRank(formData: StatisticalRoomRankByDateDto): Promise<any> {
    try {
      let dataRoomRanks: any = [];

      const { startDate, endDate } = formData;
      const start = moment(startDate).toDate();
      const end = moment(endDate).toDate();

      const [bookings, roomRanks] = await Promise.all([
        this.bookingService.findByBetweenDate(start, end),
        this.roomRankModel.find().exec(),
      ]);

      for (const roomRank of roomRanks) {
        const dataRoomRank = {
          id: `${roomRank._id}`,
          name: roomRank.name,
          value: 0,
        };
        dataRoomRanks = [...dataRoomRanks, dataRoomRank];
      }

      const bookingDetails = await this.bookingDetailService.findByBookings(
        bookings.map(booking => `${booking._id}`)
      );

      const groupBookingDetailTotalQuantityByRoomRank = _.groupBy(
        bookingDetails.map(detail => {
          return {
            id: `${detail.roomRank._id}`,
            quantity: detail.quantity,
          };
        }),
        'id',
      );

      const resTotalRoomRankByDate = Object.entries(groupBookingDetailTotalQuantityByRoomRank).map(([key, value]) => {
        const total = _.reduce(value, (sum, detail) => {
          return sum + detail.quantity;
        }, 0);
        return {
          id: key,
          value: total,
        };

      });

      const merged = _.merge(_.keyBy(dataRoomRanks, 'id'), _.keyBy(resTotalRoomRankByDate, 'id'));
      const values = _.values(merged);
      return values;
    } catch (error) {
      throw error;
    }
  }
}
