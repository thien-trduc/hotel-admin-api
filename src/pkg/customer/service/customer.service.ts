import { CustomerDocument } from './../../../schemas/customer.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CUSTOMER_COLLECTION, CUSTOMER_DETAIL_COLLECTION } from 'src/schemas/constant';
import { Customer } from 'src/schemas/customer.schema';
import { MongoCoreService, Pagination } from 'src/utils/core/abstract.mongo';
import { isEmpty } from 'lodash';
import { CustomerDetailDocument } from 'src/schemas/customer-detail.schema';

@Injectable()
export class CustomerService extends MongoCoreService<Customer> {
  constructor(
    @InjectModel(CUSTOMER_COLLECTION) model: Model<CustomerDocument>,
  ) {
    super(model);
  }

}
