import { Injectable } from '@nestjs/common';
import { ConfigManager } from '@nestjsplus/config';
import * as Joi from 'joi';

@Injectable()
export class ConfigRepoService extends ConfigManager {
  provideConfigSpec() {
    return {
      SERVER_PORT: {
        validate: Joi.number(),
        required: true,
        default: 5432,
      },
    };
  }

  getServerPort(): number {
    return this.get<number>('SERVER_PORT')
  }

  getSwaggerPassword(): string {
    return this.get<string>('SWAGGER_PASSWORD')
  }

}