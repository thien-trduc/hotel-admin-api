import { Injectable } from '@nestjs/common';
import { ConfigManager } from '@nestjsplus/config';
import * as Joi from 'joi';
import { SendgridOptions } from './sendgridConnection';

@Injectable()
export class SendgridConfigService extends ConfigManager {
    provideConfigSpec() {
        return {
            SENDGRID_API_KEY: {
                validate: Joi.string(),
                required: true,
            },
            SENDGRID_SENDER: {
                validate: Joi.string(),
                required: true,
            },
        };
    }

    setApiKey(): SendgridOptions {
        return {
            apiKey: this.get<string>('SENDGRID_API_KEY'),
        };
    }

    getListUserRevieveError() {
        return [
            this.get<string>('SENDGRID_EMAIL_RECEIVE_ERROR_2'),
        ];
    }

    getApiKey(): string {
        return this.get<string>('SENDGRID_API_KEY');
    }

    getSender(): string {
        return this.get<string>('SENDGRID_SENDER');
    }
}
