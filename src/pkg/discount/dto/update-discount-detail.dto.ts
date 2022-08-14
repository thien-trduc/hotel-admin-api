import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateDiscountDetail {
    @ApiProperty({ description: 'ID_HANG' })
    @IsNotEmpty()
    @Transform(o => `${o.value}`.trim())
    roomRank: string;

    @ApiProperty({ description: 'GIATRI' })
    @IsNumber()
    value: number;
}