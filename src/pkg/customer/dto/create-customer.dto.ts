import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, Length, ValidateIf } from 'class-validator';

export class CreateCustomerDto {

    @ApiProperty({ description: 'CMND' })
    @IsNotEmpty({ message: 'CMND không được bỏ trống' })
    @Length(1, 20, { message: 'CMND phải có 9 chữ số và không quá 20 kí tự' })
    idCard: string;

    @ApiProperty({ description: 'TENKH' })
    @IsNotEmpty({ message: 'Tên khách hàng không được bỏ trống' })
    @Length(1, 50, { message: 'Tên khách hàng không quá 50 kí tự' })
    @Transform(o => `${o.value}`.trim().toUpperCase())
    fullName: string;

    @ApiProperty({ description: 'SDT' })
    @IsNotEmpty({ message: 'Số điện thoại không được bỏ trống' })
    @Length(1, 15, { message: 'Số diện thoại không quá 15 kí tự' })
    phone: string;

    @ApiProperty({ description: 'DIACHI' })
    @Length(1, 100, { message: 'Địa chỉ không quá 100 kí tự' })
    @ValidateIf(v => v.address)
    address: string;

    @ApiProperty({ description: 'EMAIL' })
    @IsEmail({}, { message: 'Email không đúng định dạng' })
    @Length(1, 100, { message: 'Địa chỉ email không quá 100 kí tự' })
    @ValidateIf(v => v.address)
    email: string;
}