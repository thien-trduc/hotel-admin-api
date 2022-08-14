import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthEmployeeGuard } from 'src/pkg/user/guard/jwt-auth-employee.guard';
import { RoomType } from 'src/schemas/room-type.schema';
import { RequestDto } from 'src/utils/core/dto/request.dto';
import { ResponseDto } from 'src/utils/core/dto/response.dto';

import { CreateRoomTypeDto } from '../dto/create-room-type.dto';
import { UpdateRoomTypeDto } from '../dto/update-room-type.dto';
import { RoomTypeService } from '../service/room-type.service';

@Controller('room-type')
@ApiTags('Room Type')
export class RoomTypeController {
  constructor(private readonly service: RoomTypeService) {}

  @UseGuards(JwtAuthEmployeeGuard)
  @Post()
  @ApiBearerAuth()
  @ApiBody({
    type: CreateRoomTypeDto
  })
  async create(@Body() formData: CreateRoomTypeDto): Promise<RoomType> {
    return this.service.create(formData);
  }

  @Post('search')
  @HttpCode(200)
  @ApiBody({
    type: RequestDto
  })
  async search(@Body() formData: RequestDto): Promise<ResponseDto<RoomType>> {
    const { pagination, query, sort } = formData;
    return this.service.search(pagination, query, sort);
  }

  @Post('list')
  @HttpCode(200)
  @ApiBody({
    type: RequestDto
  })
  async find(@Body() formData: RequestDto): Promise<ResponseDto<RoomType>> {
    const { pagination, query, sort } = formData;
    return this.service.find(pagination, query, sort);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
  })
  async findOne(@Param('id') id: string): Promise<RoomType> {
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
    type: UpdateRoomTypeDto
  })
  async update(@Param('id') id: string, @Body() formData: UpdateRoomTypeDto): Promise<RoomType> {
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
}
