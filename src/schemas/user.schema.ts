import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { ROLE_COLLECTION } from './constant';
import { Role } from './role.schema';

@Schema()
export class User {
    @ApiProperty({ description: 'USERNAME' })
    @Prop({ length: 50, required: true })
    username: string;

    @Prop({ length: 150 })
    password: string;

    @ApiProperty({ description: 'HIEULUC' })
    @Prop({ default: true })
    enable: boolean;

    @ApiProperty({ description: 'ROLE_ID' })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: ROLE_COLLECTION })
    role: Role;

    @ApiProperty({ description: 'AVATAR' })
    @Prop()
    avatar: string;

    // constructor(partial: Partial<User>) {
    //     Object.assign(this, partial);
    // }

    async comparePassword(inputPassword: string): Promise<boolean> {
        const result = await bcrypt.compare(inputPassword, this.password);
        return result ? true : false;
    }
}