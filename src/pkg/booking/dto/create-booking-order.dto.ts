import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';
import * as moment from 'moment';

export class CreateBookingOrderDto {
    @ApiProperty({description: 'ID_HANGPHONG'})
    @IsNotEmpty()
    // @Transform(o => `${o.value}`.trim())
    roomRank: string;

    @ApiProperty({description: 'SOLUONG'})
    @IsNumber()
    quantity: number;

    @ApiProperty({description: 'DONGIA'})
    @IsNumber()
    price: number;

    @ApiProperty({description: 'THANHTIEN'})
    @IsNumber()
    totalPrice: number;

    @ApiProperty({description: 'ID_USER_KH'})
    @IsNotEmpty()
    // @Transform(o => `${o.value}`.trim())
    user: string;

    @ApiProperty({description: 'ID_KH'})
    @IsNotEmpty()
    // @Transform(o => `${o.value}`.trim())
    customer: string;

    @ApiProperty({ description: 'NGAY' })
    // @IsDateString({ }, {
    //     message: 'Thông tin ngày nhận. ISOString',
    // })
    // @Transform(o => moment(o.value).toDate())
    checkInDate: string;

    @ApiProperty({ description: 'NGAY' })
    // @IsDateString({  }, {
    //     message: 'Thông tin ngày trả. ISOString',
    // })
    // @Transform(o => moment(o.value).toDate())
    checkOutDate: string;

    @ApiProperty({ description: 'NGAY' })
    // @IsDateString({ }, {
    //     message: 'Thông tin ngày đặt. ISOString',
    // })
    // @Transform(o => moment(o.value).toDate())
    bookingDate: string;
}