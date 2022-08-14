import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { myUuid } from 'src/utils/utils';

export class CreateRoomCategoryDto {
    @ApiProperty({ description: 'MALP' })
    @IsNotEmpty()
    @Transform(o => {
        const code = `${o.value}`.trim()
        return `LOAI_${myUuid()}_${code}`.toUpperCase();
    })
    categoryCode: string;

    @ApiProperty({ description: 'TENLOAPHONG' })
    @IsNotEmpty()
    @Transform(o => `${o.value}`.trim().toUpperCase())
    name: string;


}