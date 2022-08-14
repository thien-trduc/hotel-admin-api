import { SERVICE_COLLECTION, SERVICE_PRICE_COLLECTION } from './constant';
import { Schema,Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Service } from './service.schema';

export type ServicePriceDocument = ServicePrice & Document;

@Schema({
    collection: SERVICE_PRICE_COLLECTION,
    timestamps: true,
    versionKey: false,
})
export class ServicePrice  {
    @ApiProperty({ description: 'ID_SERVICE' })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: SERVICE_COLLECTION, required: true })
    service: Service;

    @ApiProperty({ description: 'NGAY' })
    @Prop({ required: true })
    date: Date;

    @ApiProperty({ description: 'GIA' })
    @Prop({ required: true })
    price: number;
}
export const ServicePriceSchema = SchemaFactory.createForClass(ServicePrice);
ServicePriceSchema.index({ 'service': 1, 'date': 1 }, { unique: true });
