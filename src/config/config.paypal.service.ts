import { Injectable } from '@nestjs/common';
import { ConfigManager } from '@nestjsplus/config';
import * as Joi from 'joi';
import * as paypal from 'paypal-rest-sdk';

@Injectable()
export class ConfigPaypalService extends ConfigManager {
    provideConfigSpec() {
        return {
            PAYPAL_CLIENTID: {
                validate: Joi.string(),
                required: true,
            },
            PAYPAL_CLIENTSECRET: {
                validate: Joi.string(),
                required: true,
            },
        }
    }

    getPaypalClientID(): string {
        return this.get<string>('PAYPAL_CLIENTID')
    }

    getPaypalClientSecret(): string {
        return this.get<string>('PAYPAL_CLIENTSECRET')
    }


    getConfigPaypal(): any {
        return paypal.configure({
            'mode': 'sandbox',
            'client_id': this.getPaypalClientID(),
            'client_secret': this.getPaypalClientSecret(),
        });
    }
}