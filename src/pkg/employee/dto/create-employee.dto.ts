import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsMobilePhone, IsNotEmpty } from 'class-validator';

export class CreateEmployeeDto {
    @ApiProperty({ description: 'TEN' })
    @IsNotEmpty()
    @Transform(o => `${o.value}`.trim().toUpperCase())
    fullName: string;

    @ApiProperty({ description: 'SDT' })
    @IsNotEmpty()
    @Transform(o => `${o.value}`.trim())
    @IsMobilePhone('vi-VN', {}, { message: 'phone không đúng định dạng' })
    phone: string;

    @ApiProperty({ description: 'DIACHI' })
    @Transform(o => `${o.value}`.trim())
    address: string;

    @ApiProperty({ description: 'ID_PHONGBAN' })
    @IsNotEmpty()
    @Transform(o => `${o.value}`.trim())
    department: string;
}