import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { BookingOrder, BookingOrderDocument } from 'src/schemas/booking-order.schema';
import { BOOKING_ORDER_COLLECTION, USER_CUSTOMER_COLLECTION } from 'src/schemas/constant';
import { UserCustomerDocument } from 'src/schemas/user-customer.schema';
import { MongoCoreService, Pagination } from 'src/utils/core/abstract.mongo';
import * as _ from 'lodash';
import { ResponseDto } from 'src/utils/core/dto/response.dto';

@Injectable()
export class BookingOrderService extends MongoCoreService<BookingOrder> {
  constructor(
    @InjectModel(BOOKING_ORDER_COLLECTION) private bookingOrderModel: Model<BookingOrderDocument>,
  ) {
    super(bookingOrderModel);
  }

  async findByUserId(userId: string): Promise<(BookingOrder & Document)[]> {
    return this.bookingOrderModel.find({ user: userId }).exec();
  }

  async findBookingOrderUser(
    pagination: Pagination,
    query: any,
    sort: any,
  ): Promise<ResponseDto<any>> {
    try {
      const { pageIndex, pageSize } = pagination;
      let filter: any = {};
      let order: any = {};
      filter = _.isEmpty(query) ? { ...filter, ...query } : filter;
      order = _.isEmpty(sort) ? { ...order, ...sort } : { createdAt: 'desc' };
      const [rows, totalRows] = await Promise.all([
        this.model
          .find({ ...filter })
          .populate('roomRank')
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
}
