import { ConfigPaypalService } from './config.paypal.service';
import { Global, Module } from '@nestjs/common';
import { ConfigRepoService } from './config.repo.service';
import { ConfigManagerModule } from '@nestjsplus/config';
import { ConfigMongoService } from './config.mongo.service';
import { ConfigCloudinaryService } from './config.cloudinay.service';
import { JwtUserEmployeeConfigService } from './config.jwt-user-employee.service';
import { JwtUserCustomerConfigService } from './config.jwt-user-customer.service';
import { SendgridConfigService } from './config.sendgrid.sevice';

@Global()
@Module({
    imports: [
        ConfigManagerModule.register({
            useEnv: {
                folder: 'config',
            },
            allowExtras: true,
        }),
    ],
    providers: [
        ConfigRepoService,
        ConfigMongoService,
        ConfigPaypalService,
        SendgridConfigService,
        ConfigCloudinaryService,
        JwtUserEmployeeConfigService,
        JwtUserCustomerConfigService,
    ],
    exports: [
        ConfigRepoService,
        ConfigMongoService,
        ConfigPaypalService,
        SendgridConfigService,
        ConfigCloudinaryService,
        JwtUserEmployeeConfigService,
        JwtUserCustomerConfigService,
    ],
})
export class ConfigsModule {}
