import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDiscountDetailDto {
    @ApiProperty({ description: 'ID_HANG' })
    @IsNotEmpty()
    @Transform(o => `${o.value}`.trim())
    roomRank: string;

    @ApiProperty({ description: 'ID_KHUYENMAI' })
    @IsNotEmpty()
    @Transform(o => `${o.value}`.trim())
    discount: string;

    @ApiProperty({ description: 'GIATRI' })
    @IsNumber()
    value: number;
}
