import { SERVICE_COLLECTION } from './constant';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ServiceDocument = Service & Document;

@Schema({
    collection: SERVICE_COLLECTION,
    timestamps: true,
    versionKey: false,
})
export class Service {
    @ApiProperty({ description: 'TEN' })
    @Prop({ length: 30, required: true })
    name: string;

    @ApiProperty({ description: 'MOTA' })
    @Prop({ length: 255, required: true })
    description: string;
}
export const ServiceSchema = SchemaFactory.createForClass(Service);
