import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthEmployeeGuard } from 'src/pkg/user/guard/jwt-auth-employee.guard';
import { Room } from 'src/schemas/room.schema';
import { RequestDto } from 'src/utils/core/dto/request.dto';
import { ResponseDto } from 'src/utils/core/dto/response.dto';
import { CreateRoomDto } from '../dto/create-room.dto';
import { FindByDynamicQueryDto } from '../dto/find-by-dynamic-query.dto';
import { UpdateRoomDto } from '../dto/update-room.dto';
import { UpdateStatusRoomDto } from '../dto/update-status-room.dto';
import { RoomService } from '../service/room.service';

@Controller('room')
@ApiTags('Room')
export class RoomController {
  constructor(private readonly service: RoomService) {}

  @UseGuards(JwtAuthEmployeeGuard)
  @Post()
  @ApiBearerAuth()
  @ApiBody({
    type: CreateRoomDto,
  })
  async create(@Body() formData: CreateRoomDto): Promise<Room> {
    return this.service.create(formData);
  }

  @Post('search')
  @HttpCode(200)
  @ApiBody({
    type: RequestDto,
  })
  async search(@Body() formData: RequestDto): Promise<ResponseDto<Room>> {
    const { pagination, query, sort } = formData;
    return this.service.search(pagination, query, sort);
  }

  @Post('list')
  @HttpCode(200)
  @ApiBody({
    type: RequestDto,
  })
  async find(@Body() formData: RequestDto): Promise<ResponseDto<Room>> {
    const { pagination, query, sort } = formData;
    return this.service.find(pagination, query, sort);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
  })
  async findOne(@Param('id') id: string): Promise<Room> {
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
    type: UpdateRoomDto,
  })
  async update(@Param('id') id: string, @Body() formData: UpdateRoomDto): Promise<Room> {
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

  // @UseGuards(JwtAuthEmployeeGuard)
  @Post('find-by-dynamic')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Lấy danh sách phòng ban theo dynamic query',
    description: 'Lấy danh sách phòng ban theo dynamic query',
  })
  async findByDynamic(@Body() formData: FindByDynamicQueryDto): Promise<any> {
    return this.service.findByDynamicQuery(formData);
  }

  @Patch('update-status')
  @UseGuards(JwtAuthEmployeeGuard)
  async updateStatusRoom(@Body() form: UpdateStatusRoomDto): Promise<any> {
    return this.service.updateStatusRoom(form);
  }

}
