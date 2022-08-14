import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookingDetail, BookingDetailDocument } from 'src/schemas/booking-detail.schema';
import { BOOKING_DETAIL_COLLECTION } from 'src/schemas/constant';
import { MongoCoreService } from 'src/utils/core/abstract.mongo';

@Injectable()
export class BookingDetailService extends MongoCoreService<BookingDetail> {
  constructor(@InjectModel(BOOKING_DETAIL_COLLECTION) private bookingDetailModel: Model<BookingDetailDocument>) {
    super(bookingDetailModel);
  }

  async findByBookings(bookingIds: any[]): Promise<any> {
    try {
      return this.bookingDetailModel
        .find({
          booking: {
            $in: [...bookingIds],
          },
        })
        .populate('booking')
        .populate('roomRank')
        .exec();
    } catch (error) {
      throw error;
    }
  }

  async findByBooking(booking: string): Promise<any> {
    try {
      return this.bookingDetailModel.find({ booking }).populate('booking').populate('roomRank').exec();
    } catch (error) {
      throw error;
    }
  }
}
