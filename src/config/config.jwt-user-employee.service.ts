import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { ConfigManager } from '@nestjsplus/config';
import * as Joi from 'joi';

@Injectable()
export class JwtUserEmployeeConfigService extends ConfigManager implements JwtOptionsFactory {

    provideConfigSpec() {
        return {
            EMPLOYEE_JWT_SECRET: {
                validate: Joi.string(),
                required: true,
            },
            EMPLOYEE_JWT_EXPIRE_IN: {
                validate: Joi.string(),
                required: true,
            },
        };
    }

    createJwtOptions(): JwtModuleOptions {
        return {
            secret: this.get<string>('EMPLOYEE_JWT_SECRET'),
            signOptions: { expiresIn: this.get<string>('EMPLOYEE_JWT_EXPIRE_IN') },
        };
    }

    getEmployeeJwtSecret(): string {
        return this.get<string>('EMPLOYEE_JWT_SECRET')
    }
}
