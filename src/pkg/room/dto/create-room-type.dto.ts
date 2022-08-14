import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { myUuid } from 'src/utils/utils';

export class CreateRoomTypeDto {
    @ApiProperty({description: 'MAKP'})
    @IsNotEmpty()
    @Transform(o => {
        const code = `${o.value}`.trim()
        return `KIEU_${myUuid()}_${code}`.toUpperCase();
    })
    typeCode: string;

    @ApiProperty({description: 'TENKIEUPHONG'})
    @IsNotEmpty()
    @Transform(o => `${o.value}`.trim().toUpperCase())
    name: string;
}