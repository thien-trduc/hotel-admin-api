import { Injectable } from '@nestjs/common';
import { ConfigManager } from '@nestjsplus/config';
import { ConfigOptions } from 'cloudinary';
import * as Joi from 'joi';

@Injectable()
export class ConfigCloudinaryService extends ConfigManager {
    provideConfigSpec() {
        return {
            CLOUDINARY_NAME: {
                validate: Joi.string(),
                required: true,
            },
            CLOUDINARY_KEY: {
                validate: Joi.string(),
                required: true,
            },
            CLOUDINARY_SECRET: {
                validate: Joi.string(),
                required: true,
            },
            ROOM_BUCKET: {
                validate: Joi.string(),
                required: true,
            },
            EMPLOYEE_BUCKET: {
                validate: Joi.string(),
                required: true,
            },
            CUSTOMER_BUCKET: {
                validate: Joi.string(),
                required: true,
            }
        }
    }

    getCloudinaryName(): string{
        return this.get<string>('CLOUDINARY_NAME');
    }

    getCloudinaryKey(): string{
        return this.get<string>('CLOUDINARY_KEY');
    }

    getCloudinarySecret(): string {
        return this.get<string>('CLOUDINARY_SECRET');
    }

    getConfigCloudinary(): ConfigOptions {
        return {
            api_key: this.getCloudinaryKey(),
            api_secret: this.getCloudinarySecret(),
            cloud_name: this.getCloudinaryName(),
        }
    }

    getRoomBucket(): string{
        return this.get<string>('ROOM_BUCKET');
    }
    
    getEmployeeBucket(): string{
        return this.get<string>('EMPLOYEE_BUCKET');
    }

    getCustomerBucket(): string{
        return this.get<string>('CUSTOMER_BUCKET');
    }
}