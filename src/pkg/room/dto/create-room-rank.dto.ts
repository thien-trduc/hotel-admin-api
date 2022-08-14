import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateRoomRankDto {
    @ApiProperty({ description: 'TENHANG' })
    @IsNotEmpty()
    @Transform(o => `${o.value}`.trim().toUpperCase())
    name: string;

    @ApiProperty({ description: 'MOTA' })
    @Transform(o => `${o.value}`.trim())
    description: string;

    @ApiProperty({ description: 'HINHANH' })
    images: string[];

    @ApiProperty({ description: 'ID_LOAIPHONG' })
    @IsNotEmpty()
    @Transform(o => `${o.value}`.trim())
    roomType: string;

    @ApiProperty({ description: 'ID_KIEUPHONG' })
    @IsNotEmpty()
    @Transform(o => `${o.value}`.trim())
    roomCategory: string;
}