import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString } from 'class-validator';
import * as moment from 'moment';

export class CreateBookingDto {
    @ApiProperty({ description: 'NGAYDAT'})
    // @IsDateString({ strict: true }, {
    //     message: 'Thông tin ngày đặt. ISOString',
    // })
    // @Transform(o => moment(o.value).toDate())
    date: string;

    @ApiProperty({ description: 'NGAYNHANPHONG'})
    // @IsDateString({ strict: true }, {
    //     message: 'Thông tin ngày nhận phòng. ISOString',
    // })
    // @Transform(o => moment(o.value).toDate())
    checkInDate: string;

    @ApiProperty({ description: 'NGAYTRAPHONG'})
    // @IsDateString({ strict: true }, {
    //     message: 'Thông tin ngày trả phòng. ISOString',
    // })
    // @Transform(o => moment(o.value).toDate())
    checkOutDate: string;

    @ApiProperty({ description: 'SOTIENDATCOC'})
    price: number;

    @ApiProperty({ description: 'TRANGTHAI'})
    status: string;

    @ApiProperty({ description: 'MAKH'})
    customer: string;

    @ApiProperty({ description: 'GHICHU'})
    description: string;
}