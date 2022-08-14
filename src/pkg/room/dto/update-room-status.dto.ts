import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class UpdateRoomStatusDto {
    @ApiProperty({description: 'TRANGTHAI'})
    @IsNotEmpty()
    @Transform(o => `${o.value}`.trim().toUpperCase())
    status: string;
}