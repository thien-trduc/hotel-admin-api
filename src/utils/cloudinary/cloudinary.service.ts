import { ConfigCloudinaryService } from './../../config/config.cloudinay.service';
import { HttpException, Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { bufferToStream, myUuid } from '../utils';

@Injectable()
export class CloudinaryService {

    constructor(
        private configCloudinaryService: ConfigCloudinaryService,
    ) { }

    async upload(res: any, bucket: string, file: Buffer): Promise<any> {
        cloudinary.config(this.configCloudinaryService.getConfigCloudinary());
        const stream = cloudinary.uploader.upload_stream(
            { folder: bucket },
            (error, result) => {
                if (error) {
                    throw new HttpException(error.message, error.http_code);
                }
                return res.json({ url: result.secure_url });
            }
        );
        return bufferToStream(file).pipe(stream);
    }
}
