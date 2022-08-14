import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import { ConfigManager } from '@nestjsplus/config';
import * as Joi from 'joi'

export class ConfigMongoService extends ConfigManager implements MongooseOptionsFactory {
    provideConfigSpec() {
        return {
            MONGO_HOST: {
                validate: Joi.string(),
                required: true,
            },
            MONGO_PORT: {
                validate: Joi.number(),
                required: true,
            },
            MONGO_DATABASE: {
                validate: Joi.string(),
                required: true,
            }
        }
    }

    getMongoHost(): string {
        return this.get<string>('MONGO_HOST')
    }

    getMongoPort(): number {
        return this.get<number>('MONGO_PORT')
    }

    getMongoName(): string {
        return this.get<string>('MONGO_DATABASE')
    }

    getMongoConfig() {
        return {
            username: this.get<string>('MONGO_USERNAME'),
            password: this.get<string>('MONGO_PASSWORD'),
            host: this.get<string>('MONGO_HOST'),
            port: this.get<string>('MONGO_PORT'),
            database: this.get<string>('MONGO_DATABASE'),
        };
    }


    getConfigMongoUri(): string {
        return `mongodb://${this.getMongoHost()}:${this.getMongoPort()}/${this.getMongoName()}`
    }

    createMongooseOptions(): MongooseModuleOptions {
        const { username, password, host, port, database } = this.getMongoConfig();
        // const uri = `mongodb://${!!username && !!password ? `${username}:${encodeURIComponent(password)}@` : ``
        //     }${host}:${port}/${database}?authSource=admin`;
        // return {
        //     uri,
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        // };
        const uri = `mongodb+srv://${!!username && !!password ? `${username}:${encodeURIComponent(password)}@` : ``
            }${host}/${database}?retryWrites=true&w=majority`;
        return {
            uri,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
    }
}