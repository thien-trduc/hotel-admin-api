import { MongoCoreService } from 'src/utils/core/abstract.mongo';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SERVICE_PRICE_COLLECTION } from 'src/schemas/constant';
import { Model } from 'mongoose';
import { ServicePrice, ServicePriceDocument } from 'src/schemas/service-price.schema';

@Injectable()
export class ServiceMongoPriceService extends MongoCoreService<ServicePrice> {
    constructor(
        @InjectModel(SERVICE_PRICE_COLLECTION) private servicePriceModel: Model<ServicePriceDocument>
    ) {
        super(servicePriceModel)
    }
}
