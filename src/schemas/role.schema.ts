import { ROLE_COLLECTION } from './constant';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type RoleDocument = Role & Document;

@Schema({
    collection: ROLE_COLLECTION,
    timestamps: true,
    versionKey: false,
})
export class Role {
    @ApiProperty({ description: 'ROLENAME'})
    @Prop({ length: 30, required: true ,unique: true })
    roleName: string;
}
export const RoleSchema = SchemaFactory.createForClass(Role);