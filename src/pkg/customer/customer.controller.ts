import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Customer } from 'src/schemas/customer.schema';
import { RequestDto } from 'src/utils/core/dto/request.dto';
import { ResponseDto } from 'src/utils/core/dto/response.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerService } from './service/customer.service';

@Controller('customer')
@ApiTags('Customer')
export class CustomerController {
  constructor(private readonly service: CustomerService) {}

  @Post()
  @ApiBody({
    type: CreateCustomerDto
  })
  async create(@Body() formData: CreateCustomerDto): Promise<Customer> {
    return this.service.create(formData);
  }

  @Post('search')
  @HttpCode(200)
  @ApiBody({
    type: RequestDto
  })
  async search(@Body() formData: RequestDto): Promise<ResponseDto<Customer>> {
    const { pagination, query, sort } = formData;
    return this.service.search(pagination, query, sort);
  }

  @Post('list')
  @HttpCode(200)
  @ApiBody({
    type: RequestDto
  })
  async find(@Body() formData: RequestDto): Promise<ResponseDto<Customer>> {
    const { pagination, query, sort } = formData;
    return this.service.find(pagination, query, sort);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
  })
  async findOne(@Param('id') id: string): Promise<Customer> {
    return this.service.findById(id);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiBody({
    type: UpdateCustomerDto
  })
  async update(@Param('id') id: string, @Body() formData: UpdateCustomerDto): Promise<Customer> {
    return this.service.updateById(id, formData);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiParam({
    name: 'id',
    type: String,
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.service.removeById(id);
  }
}
