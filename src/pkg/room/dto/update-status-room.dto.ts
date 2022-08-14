import { IsNotEmpty } from 'class-validator';

export class UpdateStatusRoomDto {

    @IsNotEmpty()
    roomId: string;

    @IsNotEmpty()
    status: string;

}