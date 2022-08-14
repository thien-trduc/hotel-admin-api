import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
    @ApiProperty()
    @IsNotEmpty()
    @Transform(o => `${o.value}`.trim().toUpperCase())
    roleName: string;
}