import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserCustomerDto {
    @ApiProperty({ description: 'USERNAME' })
    @IsNotEmpty()
    username: string;

    @ApiProperty({ description: 'PASSWORD' })
    @IsNotEmpty()
    password: string;

    @ApiProperty({ description: 'ROLE_ID' })
    role: string;

    @ApiProperty({description: 'AVATAR'})
    avatar: string;
    
    @ApiProperty({ description: 'MAKH' })
    @IsNotEmpty()
    customer: string;
}