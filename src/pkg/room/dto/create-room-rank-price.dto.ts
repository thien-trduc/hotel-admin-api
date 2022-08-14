import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber, ValidateIf } from 'class-validator';
import * as moment from 'moment';

export class CreateRoomRankPriceDto {
    @ApiProperty({ description: 'ID_HANG' })
    @IsNotEmpty()
    roomRank: string;

    @ApiProperty({ description: 'NGAY' })
    @IsDateString({ strict: true }, {
        message: 'Thông tin ngày áp dụng giá. ISOString',
    })
    @ValidateIf(o => o.startTime)
    @Transform(o => moment(o.value))
    date: Date;

    @ApiProperty({ description: 'GIA' })
    @IsNumber()
    price: number;
}