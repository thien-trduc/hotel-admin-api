import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthEmployeeGuard } from 'src/pkg/user/guard/jwt-auth-employee.guard';
import { RoomRankPrice } from 'src/schemas/room-rank-rice.schema';
import { RoomRank } from 'src/schemas/room-rank.schema';
import { RequestDto } from 'src/utils/core/dto/request.dto';
import { ResponseDto } from 'src/utils/core/dto/response.dto';
import { CreateRoomRankPriceDto } from '../dto/create-room-rank-price.dto';

import { CreateRoomRankDto } from '../dto/create-room-rank.dto';
import { UpdateRoomRankPriceDto } from '../dto/update-room-rank-price.dto';
import { UpdateRoomRankDto } from '../dto/update-room-rank.dto';
import { RoomRankPriceService } from '../service/room-rank-price.service';
import { RoomRankService } from '../service/room-rank.service';
import { StatisticalRoomRankByDateDto } from '../dto/statistical-room-rank-by-date.dto';

@Controller('room-rank')
@ApiTags('Room Rank')
export class RoomRankController {
  constructor(
      private readonly service: RoomRankService,
      private readonly roomRankPriceService: RoomRankPriceService,
  ) {}

  @UseGuards(JwtAuthEmployeeGuard)
  @Post('statistical-room-rank')
  @HttpCode(200)
  async statisticalRoomRank(@Body() formData: StatisticalRoomRankByDateDto): Promise<any> {
      return this.service.statisticalRoomRank(formData);
  }


  @UseGuards(JwtAuthEmployeeGuard)
  @Post()
  @ApiBearerAuth()
  @ApiBody({
    type: CreateRoomRankDto
  })
  async create(@Body() formData: CreateRoomRankDto): Promise<RoomRank> {
    return this.service.create(formData);
  }

  @Post('search')
  @HttpCode(200)
  @ApiBody({
    type: RequestDto
  })
  async search(@Body() formData: RequestDto): Promise<ResponseDto<RoomRank>> {
    return this.service.searchWithPrice(formData);
  }

  @Post('list-discount-booking')
  @HttpCode(200)
  @ApiBody({
    type: RequestDto
  })
  async getRoomRankDiscountBooking(@Body() formData: RequestDto): Promise<ResponseDto<RoomRank>> {
    return this.service.getRoomRankDiscountBooking(formData);
  }

  @Post('list-booking')
  @HttpCode(200)
  @ApiBody({
    type: RequestDto
  })
  async getRoomRankBooking(@Body() formData: RequestDto): Promise<ResponseDto<RoomRank>> {
    return this.service.getRoomRankBooking(formData);
  }

  @Get('list-booking-and-discount')
  async getRoomRankAndDiscountBooking(): Promise<ResponseDto<RoomRank>> {
    return this.service.getRoomRankAndDiscountBooking();
  }

  @Post('list')
  @HttpCode(200)
  @ApiBody({
    type: RequestDto
  })
  async find(@Body() formData: RequestDto): Promise<ResponseDto<RoomRank>> {
    return this.service.findWithPrice(formData);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
  })
  async findOne(@Param('id') id: string): Promise<RoomRank> {
    return this.service.getByIdWithPrice(id);
  }

  @UseGuards(JwtAuthEmployeeGuard)
  @Put(':id')
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiBody({
    type: UpdateRoomRankDto,
  })
  async update(@Param('id') id: string, @Body() formData: UpdateRoomRankDto): Promise<RoomRank> {
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


  @Get(':id/price/:idPrice')
  @ApiOperation({ summary: 'L???y gi?? c???a h???ng ph??ng theo id' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiParam({
    name: 'idPrice',
    type: String,
  })
  async getPriceById(@Param('idPrice') idPrice: string): Promise<RoomRankPrice> {
    return this.roomRankPriceService.findById(idPrice);
  }

  @Post(':id/price/list')
  @ApiOperation({ summary: 'L???y danh s??ch gi?? c???a h???ng ph??ng' })
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiBody({
    type: RequestDto
  })
  async findPricesService(@Param('id') roomRank: string, @Body() formData: RequestDto): Promise<ResponseDto<RoomRankPrice>> {
    const { pagination, query, sort } = formData;
    console.log(query)
    // return this.roomRankPriceService.find(pagination, { ...query, roomRank: new mongoose.Types.ObjectId(roomRank) }, sort);
    return this.roomRankPriceService.find(pagination, query, sort);

  }

  @Post(':id/price')
  @ApiOperation({ summary: 'Th??m gi?? cho h???ng ph??ng' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiBody({
    type: CreateRoomRankPriceDto
  })
  async createPriceService(@Body() formData: CreateRoomRankPriceDto): Promise<RoomRankPrice> {
    return this.roomRankPriceService.create(formData);
  }

  @Patch(':id/price/:idPrice')
  @ApiOperation({ summary: 'C???p nh???t gi?? c???a h???ng ph??ng theo id' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiParam({
    name: 'idPrice',
    type: String,
  })
  @ApiBody({
    type: UpdateRoomRankPriceDto
  })
  async updatePriceService(@Param('idPrice') idPrice: string, @Body() formData: UpdateRoomRankPriceDto): Promise<RoomRankPrice> {
    return this.roomRankPriceService.updateById(idPrice, formData);
  }

  @Delete(':id/price/:idPrice')
  @HttpCode(204)
  @ApiOperation({ summary: 'X??a gi?? c???a h???ng ph??ng theo id' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiParam({
    name: 'idPrice',
    type: String,
  })
  async removePriceService(@Param('idPrice') idPrice: string): Promise<void> {
    return this.roomRankPriceService.removeById(idPrice);
  }


}
