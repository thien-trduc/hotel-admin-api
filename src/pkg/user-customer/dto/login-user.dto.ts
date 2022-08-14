import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
    @ApiProperty()
    @IsNotEmpty({message: 'Tên Đăng nhập không được trống !'})
    username: string;

    @ApiProperty()
    @IsNotEmpty({message: 'Mật khẩu không được trống !'})
    password: string;
}