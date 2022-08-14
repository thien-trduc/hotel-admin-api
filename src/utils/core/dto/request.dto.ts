import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

class Pagination {
    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    pageIndex: number;

    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    pageSize: number;
}

// tslint:disable-next-line: max-classes-per-file
export class RequestDto {
    @ApiProperty()
    @IsNotEmpty()
    pagination: Pagination;
    @ApiProperty()
    query: any;
    @ApiProperty()
    sort: any;
}