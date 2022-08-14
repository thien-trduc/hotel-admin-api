import { CustomerDocument } from './../../../schemas/customer.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CUSTOMER_COLLECTION, CUSTOMER_DETAIL_COLLECTION } from 'src/schemas/constant';
import { Customer } from 'src/schemas/customer.schema';
import { MongoCoreService, Pagination } from 'src/utils/core/abstract.mongo';
import { isEmpty } from 'lodash';
import { CustomerDetail, CustomerDetailDocument } from 'src/schemas/customer-detail.schema';

@Injectable()
export class CustomerDetailService extends MongoCoreService<CustomerDetail> {
  constructor(
    @InjectModel(CUSTOMER_DETAIL_COLLECTION) private readonly customerDetailModel: Model<CustomerDetailDocument>,
  ) {
    super(customerDetailModel);
  }

  async getCustomerDetailByRenting(rentingDetailId: string): Promise<any> {
    try {
      console.log(rentingDetailId)
      return this.customerDetailModel.findOne({ rentingDetail: rentingDetailId }).populate('customer').exec();
    } catch (error) {
      throw error;
    }
  }

}
