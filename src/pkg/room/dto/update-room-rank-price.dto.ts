import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsNotEmpty, ValidateIf } from 'class-validator';
import * as moment from 'moment';

export class UpdateRoomRankPriceDto {
    @ApiProperty({ description: 'NGAY' })
    @IsDateString({ strict: true }, {
        message: 'Thông tin ngày áp dụng giá. ISOString',
    })
    @ValidateIf(o => o.startTime)
    @Transform(o => moment(o.value))
    date: Date;

    @ApiProperty({ description: 'GIA' })
    @IsNotEmpty()
    price: number;
}