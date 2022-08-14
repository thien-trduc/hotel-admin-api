import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsNotEmpty, ValidateIf } from 'class-validator';
import * as moment from 'moment';

export class CreateDiscountDto {
    @ApiProperty({ description: 'TEN' })
    @IsNotEmpty()
    @Transform(o => `${o.value}`.trim().toUpperCase())
    name: string;

    @ApiProperty({ description: 'NGAYBATDAU' })
    @IsDateString({ strict: true }, {
        message: 'Thông tin ngày áp dụng giá. ISOString',
    })
    @ValidateIf(o => o.startTime)
    @Transform(o => moment(o.value))
    startDate: Date;

    @ApiProperty({ description: 'NGAYKETTHUC' })
    endDate: Date;
}