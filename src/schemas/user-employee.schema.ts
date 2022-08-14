import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { EMPLOYEE_COLLECTION, SALT_ROUND, USER_EMPLOYEE_COLLECTION } from './constant';
import { Employee } from './employee.schema';
import { User } from './user.schema';

export type UserEmployeeDocument = UserEmployee & Document

@Schema({
    collection: USER_EMPLOYEE_COLLECTION,
    timestamps: true,
    versionKey: false,
})
export class UserEmployee extends User {

    @ApiProperty({ description: 'ID_NHANVIEN' })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: EMPLOYEE_COLLECTION })
    employee: Employee;
}
export const UserEmployeeSchema = SchemaFactory.createForClass(UserEmployee);
UserEmployeeSchema.pre<UserEmployee>('save',function (next) {
    const user: any = this;
    if (user.password) {
        bcrypt.hash(user.password, SALT_ROUND, (err, hash) => {
            if(err) {
                throw err;
            }
            user.password = hash;
            next();
        })
    }
})