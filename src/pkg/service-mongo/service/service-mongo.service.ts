import { MongoCoreService } from 'src/utils/core/abstract.mongo';
import { Injectable } from '@nestjs/common';
import { Service, ServiceDocument } from 'src/schemas/service.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SERVICE_COLLECTION, SERVICE_PRICE_COLLECTION } from 'src/schemas/constant';
import { Document, Model } from 'mongoose';
import { RequestDto } from 'src/utils/core/dto/request.dto';
import { ServicePriceDocument } from 'src/schemas/service-price.schema';
import { first } from 'lodash';
import { currencyFormat, dateFormat } from 'src/utils/utils';

@Injectable()
export class ServiceMongoService extends MongoCoreService<Service> {
    constructor(
        @InjectModel(SERVICE_COLLECTION) private serviceModel: Model<ServiceDocument>,
        @InjectModel(SERVICE_PRICE_COLLECTION) private servicePriceModel: Model<ServicePriceDocument>
    ) {
        super(serviceModel)
    }

    async findWithPrice(formData: RequestDto): Promise<any> {
        const { pagination, query, sort } = formData;
        const result = await this.find(pagination, query, sort);
        const { rows, ...data } = result;
        let newRows: any;
        if (rows && rows.length) {
            const serviceWithPricePromise = rows.map(async (service: (Service & Document)) => {
                return this.getPriceService(service);
            })
            const serivceWithPrice = await Promise.all(serviceWithPricePromise);
            newRows = serivceWithPrice;
        }
        return {
            ...data,
            rows: newRows
        }
    }

    async searchWithPrice(formData: RequestDto): Promise<any> {
        const { pagination, query, sort } = formData;
        const result = await this.search(pagination, query, sort);
        const { rows, ...data } = result;
        let newRows: any;
        if (rows && rows.length) {
            const serviceWithPricePromise = rows.map(async (service: (Service & Document)) => {
                return this.getPriceService(service);
            })
            const serivceWithPrice = await Promise.all(serviceWithPricePromise);
            newRows = serivceWithPrice;
        }
        return {
            ...data,
            rows: newRows
        }
    }

    async getPriceService(service: (Service & Document)): Promise<any> {
        const priceServices = await this.servicePriceModel.find({ service: service._id }).sort({ date: 'desc' }).exec()
        const priceService = first(priceServices);
        const price = priceService?.price || 0;
        return {
            ...service.toObject(),
            price,
            priceText: currencyFormat(price),
            dateText: dateFormat(priceService?.date)
        }
    }
}
