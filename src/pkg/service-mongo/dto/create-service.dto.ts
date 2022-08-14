import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateServiceDto {
    @ApiProperty({ description: 'TEN' })
    @IsNotEmpty()
    @Transform(o => `${o.value}`.trim().toUpperCase())
    name: string;

    @ApiProperty({ description: 'MOTA' })
    @IsNotEmpty()
    description: string;
}