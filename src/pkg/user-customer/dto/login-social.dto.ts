import { IsNotEmpty } from 'class-validator';

export class LoginSocialDto {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    photoUrl: string;
}