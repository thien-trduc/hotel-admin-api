import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateDepartmentDto {
    @ApiProperty({ description: 'MAPB' })
    @IsNotEmpty()
    @Transform(o => `${o.value}`.trim().toUpperCase())
    departmenCode: string;

    @ApiProperty({ description: 'TENPHONGBAN' })
    @IsNotEmpty()
    @Transform(o => `${o.value}`.trim().toUpperCase())
    fullName: string;
}