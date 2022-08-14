import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateRoomDto {
    @ApiProperty({ description: 'MAPHONG' })
    @IsNotEmpty()
    @Transform(o => `${o.value}`.trim().toUpperCase())
    roomCode: string;

    @ApiProperty({ description: 'MOTA' })
    description: string;

    @ApiProperty({ description: 'HANGPHONG' })
    @IsNotEmpty()
    @Transform(o => `${o.value}`.trim())
    roomRank: string;

    @ApiProperty({ description: 'TRANGTHAIPHONG' })
    @IsNotEmpty()
    @Transform(o => `${o.value}`.trim())
    roomStatus: string;
}