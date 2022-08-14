import { CreateDiscountDto } from './dto/create-discount.dto';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Discount } from 'src/schemas/discount.schema';
import { RequestDto } from 'src/utils/core/dto/request.dto';
import { ResponseDto } from 'src/utils/core/dto/response.dto';
import { JwtAuthEmployeeGuard } from '../user/guard/jwt-auth-employee.guard';
import { DiscountService } from './service/discount.service';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import {  UpdateDiscountDetail } from './dto/update-discount-detail.dto';
import { DiscountDetailService } from './service/discount-detail.service';
import { DiscountDetail } from 'src/schemas/discount-detail.schema';
import { CreateDiscountDetailDto } from './dto/create-discount-detail.dto';

@Controller('discount')
@ApiTags('Discount')
export class DiscountController {
  constructor(
    private readonly service: DiscountService,
    private readonly discountDetailService: DiscountDetailService,
    ) {}

  @UseGuards(JwtAuthEmployeeGuard)
  @Post()
  @ApiBearerAuth()
  @ApiBody({
    type: CreateDiscountDto
  })
  async create(@Body() formData: CreateDiscountDto): Promise<Discount> {
    return this.service.create(formData);
  }

  @Post('search')
  @HttpCode(200)
  @ApiBody({
    type: RequestDto
  })
  async search(@Body() formData: RequestDto): Promise<ResponseDto<Discount>> {
    const { pagination, query, sort } = formData;
    return this.service.search(pagination, query, sort);
  }

  @Post('list')
  @HttpCode(200)
  @ApiBody({
    type: RequestDto
  })
  async find(@Body() formData: RequestDto): Promise<ResponseDto<Discount>> {
    const { pagination, query, sort } = formData;
    return this.service.find(pagination, query, sort);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
  })
  async findOne(@Param('id') id: string): Promise<Discount> {
    return this.service.findById(id);
  }

  @UseGuards(JwtAuthEmployeeGuard)
  @Put(':id')
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiBody({
    type: UpdateDiscountDto
  })
  async update(@Param('id') id: string, @Body() formData: UpdateDiscountDto): Promise<Discount> {
    return this.service.updateById(id, formData);
  }

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

  @UseGuards(JwtAuthEmployeeGuard)
  @Post(':id/detail')
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiBody({
    type: CreateDiscountDetailDto
  })
  async createDetail(@Body() formData: CreateDiscountDetailDto): Promise<DiscountDetail> {
    return this.discountDetailService.create(formData);
  }

  @Post(':id/detail/list')
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiBody({
    type: RequestDto
  })
  async findDetailByDiscount(@Param('id') id: string,@Body() formData: RequestDto) {
    const {pagination, query, sort} =formData;
    return this.discountDetailService.find(pagination, {...query, discount: id}, sort);
  }

  @UseGuards(JwtAuthEmployeeGuard)
  @Delete(':id/detail/:idDetail')
  @HttpCode(204)
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiParam({
    name: 'idDetail',
    type: String,
  })
  async removeDetail(@Param('idDetail') idDetail: string): Promise<void> {
    return this.discountDetailService.removeById(idDetail);
  }

  @UseGuards(JwtAuthEmployeeGuard)
  @Put(':id/detail/:idDetail')
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiParam({
    name: 'idDetail',
    type: String,
  })
  @ApiBody({
    type: UpdateDiscountDetail
  })
  async updateDiscountDetail(@Param('idDetail') idDetail: string, @Body() formData: UpdateDiscountDetail): Promise<DiscountDetail> {
    return this.discountDetailService.updateById(idDetail,formData);
  }
}
