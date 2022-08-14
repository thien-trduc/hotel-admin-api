import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class UpdateRoomTypeDto {
    @ApiProperty({description: 'TENKIEUPHONG'})
    @IsNotEmpty()
    @Transform(o => `${o.value}`.trim().toUpperCase())
    name: string;
}