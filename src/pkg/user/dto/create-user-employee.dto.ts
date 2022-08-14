import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class CreateUserEmployeeDto extends CreateUserDto{
    @ApiProperty({ description: 'ID_NHANVIEN' })
    @IsNotEmpty()
    employee: string;
}