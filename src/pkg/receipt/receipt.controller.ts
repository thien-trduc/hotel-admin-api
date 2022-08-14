import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { Receipt } from 'src/schemas/receipt.schema';
import { RequestDto } from 'src/utils/core/dto/request.dto';
import { ResponseDto } from 'src/utils/core/dto/response.dto';
import { JwtAuthEmployeeGuard } from '../user/guard/jwt-auth-employee.guard';
import { StatisticalTurnOverByDateDto } from './dto/statistical-turn-over-by-date.dto';
import { ReceiptService } from './receipt.service';

@Controller('receipt')
export class ReceiptController {
    constructor(
        private readonly service: ReceiptService,
    ) { }

    // @UseGuards(JwtAuthEmployeeGuard)
    // @Post()
    // @ApiBearerAuth()
    // @ApiBody({
    //   type: CreateReceiptDto
    // })
    // async create(@Body() formData: CreateReceiptDto): Promise<Receipt> {
    //   return this.service.create(formData);
    // }

    @Post('search')
    @HttpCode(200)
    @ApiBody({
        type: RequestDto
    })
    async search(@Body() formData: RequestDto): Promise<ResponseDto<Receipt>> {
        const { pagination, query, sort } = formData;
        return this.service.searchReceipts(pagination, query, sort);
    }

    @UseGuards(JwtAuthEmployeeGuard)
    @Post('statistical-turn-over')
    @HttpCode(200)
    async statisticalTurnOverByDate(@Body() formData: StatisticalTurnOverByDateDto): Promise<any> {
        return this.service.statisticalTurnOverByDate(formData);
    }

    @Post('list')
    @HttpCode(200)
    @ApiBody({
        type: RequestDto
    })
    async find(@Body() formData: RequestDto): Promise<ResponseDto<Receipt>> {
        const { pagination, query, sort } = formData;
        return this.service.findReceipts(pagination, query, sort);
    }

    @Get(':id')
    @ApiParam({
        name: 'id',
        type: String,
    })
    async findOne(@Param('id') id: string): Promise<Receipt> {
        return this.service.findReceiptById(id);
    }

    // @UseGuards(JwtAuthEmployeeGuard)
    // @Put(':id')
    // @ApiBearerAuth()
    // @ApiParam({
    //     name: 'id',
    //     type: String,
    // })
    // @ApiBody({
    //     type: UpdateReceiptDto
    // })
    // async update(@Param('id') id: string, @Body() formData: UpdateReceiptDto): Promise<Receipt> {
    //     return this.service.updateById(id, formData);
    // }

    @UseGuards(JwtAuthEmployeeGuard)
    @Delete(':id')
    @HttpCode(204)
    @ApiBearerAuth()
    @ApiParam({
        name: 'id',
        type: String,
    })
    async remove(@Param('id') id: string): Promise<void> {
        return this.service.removeById(id);
    }
}
