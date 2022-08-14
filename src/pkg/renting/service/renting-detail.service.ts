import { RENTING_DETAIL_COLLECTION } from './../../../schemas/constant';
import { Injectable } from '@nestjs/common';
import { RentingDetail, RentingDetailDocument } from 'src/schemas/renting-detail.schema';
import { MongoCoreService } from 'src/utils/core/abstract.mongo';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RentingDetailService extends MongoCoreService<RentingDetail> {
  constructor(@InjectModel(RENTING_DETAIL_COLLECTION) private rentingDetailModel: Model<RentingDetailDocument>) {
    super(rentingDetailModel);
  }

  async findByRentings(rentingIds: any[]): Promise<RentingDetail[]> {
    try {
      return this.rentingDetailModel
        .find({
          renting: {
            $in: [...rentingIds],
          },
        })
        .sort({ renting: 'asc' })
        .exec();
    } catch (error) {
      throw error;
    }
  }

  async findByRenting(rentingId: string): Promise<any> {
    try {
      return this.rentingDetailModel
        .findOne({
          renting: rentingId,
        })
        .sort({ renting: 'asc' })
        .exec();
    } catch (error) {
      throw error;
    }
  }


  async findByRentingPopulate(renting: string): Promise<any> {
    try {
      return this.rentingDetailModel
        .find({
          renting,
        })
        .sort({ renting: 'asc' })
        .populate('room')
        .exec();
    } catch (error) {
      throw error;
    }
  }

  async getRentingDetailByDate(date: Date): Promise<any> {
    try {
      return this.rentingDetailModel.find({ dateCheckIn: { $gte: date }, dateCheckOut: { $lte: date } }).populate('room').exec();
    } catch (error) {
      throw error;
    }
  }
}
