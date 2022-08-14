import { Module } from '@nestjs/common';
import { CustomerService } from './service/customer.service';
import { CustomerController } from './customer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CUSTOMER_COLLECTION, CUSTOMER_DETAIL_COLLECTION } from '../../schemas/constant';
import { CustomerSchema } from '../../schemas/customer.schema';
import { CustomerDetailSchema } from '../../schemas/customer-detail.schema';
import { CustomerDetailService } from './service/customer-detail.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CUSTOMER_COLLECTION, schema: CustomerSchema },
      { name: CUSTOMER_DETAIL_COLLECTION, schema: CustomerDetailSchema },
    ]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerDetailService],
  exports: [CustomerService, CustomerDetailService],
})
export class CustomerModule {}
