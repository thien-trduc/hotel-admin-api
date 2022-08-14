import { DEPARTMENT_COLLECTION } from './constant';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type DepartmentDocument = Department & Document;

@Schema({
    collection: DEPARTMENT_COLLECTION,
    timestamps: true,
    versionKey: false,
})
export class Department {
    @ApiProperty({ description: 'MAPB' })
    @Prop({ length: 10, required: true})
    departmenCode: string;

    @ApiProperty({ description: 'TENPHONGBAN' })
    @Prop({ length: 50, required: true ,unique: true})
    fullName: string;
}
export const DepartmentSchema = SchemaFactory.createForClass(Department);