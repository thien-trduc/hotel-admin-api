import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { CUSTOMER_COLLECTION, SALT_ROUND, USER_CUSTOMER_COLLECTION } from './constant';
import { Customer } from './customer.schema';
import { User } from './user.schema';

export type UserCustomerDocument = UserCustomer & Document

@Schema({
    collection: USER_CUSTOMER_COLLECTION,
    timestamps: true,
    versionKey: false,
})
export class UserCustomer extends User {

    @ApiProperty({ description: 'MAKH' })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: CUSTOMER_COLLECTION })
    customer: Types.ObjectId;
}
export const UserCustomerSchema = SchemaFactory.createForClass(UserCustomer);
UserCustomerSchema.pre<UserCustomer>('save',function (next) {
    console.log('vao day')
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