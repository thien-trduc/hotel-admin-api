import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreateBookingDetail {
    @ApiProperty({description: 'ID_HANG'})
    @Transform(o => `${o.value}`.trim())
    roomRank: string;

    @ApiProperty({description: 'ID_PHIEUDAT'})
    @Transform(o => `${o.value}`.trim())
    booking: string;

    @ApiProperty({description: 'SOLUONG'})
    @IsNumber()
    quantity: number;

    @ApiProperty({description: 'DONGIA'})
    @IsNumber()
    price: string;
}