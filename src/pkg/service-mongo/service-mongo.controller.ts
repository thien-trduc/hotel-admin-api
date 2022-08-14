import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ServicePrice } from 'src/schemas/service-price.schema';
import { Service } from 'src/schemas/service.schema';
import { RequestDto } from 'src/utils/core/dto/request.dto';
import { ResponseDto } from 'src/utils/core/dto/response.dto';
import { CreateServicePrice } from './dto/create-service-price.dto';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServicePriceDto } from './dto/update-service-price.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceMongoPriceService } from './service/service-mongo-price.service';
import { ServiceMongoService } from './service/service-mongo.service';

@Controller('service-mongo')
@ApiTags('Service')
export class ServiceMongoController {
  constructor(
    private readonly service: ServiceMongoService,
    private readonly serviceMongoPriceService: ServiceMongoPriceService,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Tạo dịch vụ' })
  @ApiBody({
    type: CreateServiceDto
  })
  async create(@Body() formData: CreateServiceDto): Promise<Service> {
    return this.service.create(formData);
  }

  @Post('search')
  @HttpCode(200)
  @ApiOperation({ summary: 'Tìm kiếm dịch vụ' })
  @ApiBody({
    type: RequestDto
  })
  async search(@Body() formData: RequestDto): Promise<ResponseDto<Service>> {
    return this.service.searchWithPrice(formData);
  }

  @Post('list')
  @HttpCode(200)
  @ApiOperation({ summary: 'Lấy danh sách dịch vụ' })
  @ApiBody({
    type: RequestDto
  })
  async find(@Body() formData: RequestDto): Promise<ResponseDto<Service>> {
    return this.service.findWithPrice(formData);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy dịch vụ theo id' })
  @ApiParam({
    name: 'id',
    type: String,
  })
  async findOne(@Param('id') id: string): Promise<Service> {
    return this.service.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Lấy danh sách dịch vụ' })
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiBody({
    type: UpdateServiceDto,
  })
  async update(@Param('id') id: string, @Body() formData: UpdateServiceDto): Promise<Service> {
    return this.service.updateById(id, formData);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Xóa dịch vụ theo id' })
  @ApiParam({
    name: 'id',
    type: String,
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.service.removeById(id);
  }

  @Get(':id/price/:idPrice')
  @ApiOperation({ summary: 'Lấy giá của dịch vụ theo id' })
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiParam({
    name: 'idPrice',
    type: String,
  })
  async findPriceServiceById(@Param('idPrice') idPrice: string): Promise<ServicePrice> {
    return this.serviceMongoPriceService.findById(idPrice);
  }

  @Post(':id/price/list')
  @ApiOperation({ summary: 'Lấy danh sách giá của dịch vụ' })
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiBody({
    type: RequestDto
  })
  async findPricesService(@Param('id') id: string, @Body() formData: RequestDto): Promise<ResponseDto<ServicePrice>> {
    const { pagination, query, sort } = formData;
    return this.serviceMongoPriceService.find(pagination, { ...query, service: id }, sort);
  }

  @Post(':id/price')
  @ApiOperation({ summary: 'Thêm giá cho dịch vụ' })
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiBody({
    type: CreateServicePrice
  })
  async createPriceService(@Body() formData: CreateServicePrice): Promise<ServicePrice> {
    return this.serviceMongoPriceService.create(formData);
  }

  @Patch(':id/price/:idPrice')
  @ApiOperation({ summary: 'Cập nhật giá của dịch vụ theo id' })
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiParam({
    name: 'idPrice',
    type: String,
  })
  @ApiBody({
    type: UpdateServicePriceDto
  })
  async updatePriceService(@Param('idPrice') idPrice: string, @Body() formData: UpdateServicePriceDto): Promise<ServicePrice> {
    return this.serviceMongoPriceService.updateById(idPrice, formData);
  }

  @Delete(':id/price/:idPrice')
  @HttpCode(204)
  @ApiOperation({ summary: 'Xóa giá của dịch vụ theo id' })
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiParam({
    name: 'idPrice',
    type: String,
  })
  async removePriceService(@Param('idPrice') idPrice: string): Promise<void> {
    return this.serviceMongoPriceService.removeById(idPrice);
  }
}
