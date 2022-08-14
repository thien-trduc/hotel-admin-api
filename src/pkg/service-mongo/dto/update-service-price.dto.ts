import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, ValidateIf } from 'class-validator';
import * as moment from 'moment';

export class UpdateServicePriceDto {
    @ApiProperty({ description: 'NGAY, ISOString' })
    @IsDateString({ strict: true }, {
        message: 'Thông tin ngày áp dụng giá. ISOString',
    })
    @ValidateIf(o => o.startTime)
    @Transform(o => moment(o.value))
    date: Date;

    @ApiProperty({ description: 'GIA' })
    price: number;
}