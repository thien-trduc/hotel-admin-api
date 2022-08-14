import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { ConfigManager } from '@nestjsplus/config';
import * as Joi from 'joi';

@Injectable()
export class JwtUserCustomerConfigService extends ConfigManager implements JwtOptionsFactory {

    provideConfigSpec() {
        return {
            CUSTOMER_JWT_SECRET: {
                validate: Joi.string(),
                required: true,
            },
            CUSTOMER_JWT_EXPIRE_IN: {
                validate: Joi.string(),
                required: true,
            },
        };
    }

    createJwtOptions(): JwtModuleOptions {
        return {
            secret: this.get<string>('CUSTOMER_JWT_SECRET'),
            signOptions: { expiresIn: this.get<string>('CUSTOMER_JWT_EXPIRE_IN') },
        };
    }

    getCustomerJwtSecret(): string {
        return this.get<string>('CUSTOMER_JWT_SECRET')
    }
}
