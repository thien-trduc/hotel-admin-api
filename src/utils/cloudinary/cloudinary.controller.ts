import { Controller, Post, Response, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigCloudinaryService } from 'src/config/config.cloudinay.service';
import { CloudinaryService } from './cloudinary.service';
import { Express } from 'express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@Controller('upload')
@ApiTags('Upload')
export class CloudinaryController {
    private roomBucket: string;
    private customerBucket: string;
    private employeeBucket: string;

    constructor(
        private service: CloudinaryService,
        private configCloudinaryService: ConfigCloudinaryService,
    ){
        this.roomBucket = this.configCloudinaryService.getRoomBucket();
        this.customerBucket = this.configCloudinaryService.getCustomerBucket();
        this.employeeBucket = this.configCloudinaryService.getEmployeeBucket();
    }

    @Post('room')
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    async uploadFileRoom(@UploadedFile() file: Express.Multer.File, @Response() res): Promise<any> {
       return this.service.upload(res, this.roomBucket, file.buffer);
    }

    @Post('user')
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    async uploadFileEmployee(@UploadedFile() file: Express.Multer.File, @Response() res): Promise<any> {
       return this.service.upload(res, this.employeeBucket, file.buffer);
    }

    @Post('customer')
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    async uploadFileCustomer(@UploadedFile() file: Express.Multer.File, @Response() res): Promise<any> {
       return this.service.upload(res, this.customerBucket, file.buffer);
    }
}
