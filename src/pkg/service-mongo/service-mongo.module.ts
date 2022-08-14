import { ServiceMongoPriceService } from './service/service-mongo-price.service';
import { Module } from '@nestjs/common';
import { ServiceMongoService } from './service/service-mongo.service';
import { ServiceMongoController } from './service-mongo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SERVICE_COLLECTION, SERVICE_DETAIL_COLLECTION, SERVICE_PRICE_COLLECTION } from 'src/schemas/constant';
import { ServiceSchema } from 'src/schemas/service.schema';
import { ServiceDetailSchema } from 'src/schemas/service-detail.schema';
import { ServicePriceSchema } from 'src/schemas/service-price.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SERVICE_COLLECTION, schema: ServiceSchema },
      { name: SERVICE_DETAIL_COLLECTION, schema: ServiceDetailSchema },
      { name: SERVICE_PRICE_COLLECTION, schema: ServicePriceSchema },
    ]),
  ],
  controllers: [ServiceMongoController],
  providers: [ServiceMongoService, ServiceMongoPriceService]
})
export class ServiceMongoModule {}
