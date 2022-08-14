import { Department } from './department.schema';
import { DEPARTMENT_COLLECTION, EMPLOYEE_COLLECTION } from './constant';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema({
    collection: EMPLOYEE_COLLECTION,
    timestamps: true,
    versionKey: false,
})
export class Employee extends Document {

    @ApiProperty({ description: 'TEN' })
    @Prop({ required: true })
    fullName: string;

    @ApiProperty({ description: 'SDT' })
    @Prop({ required: true })
    phone: string;

    @ApiProperty({ description: 'DIACHI' })
    @Prop()
    address: string;

    @ApiProperty({ description: 'ID_PHONGBAN' })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: DEPARTMENT_COLLECTION, required: true })
    department: Department;
}
export const EmployeeSchema = SchemaFactory.createForClass(Employee);