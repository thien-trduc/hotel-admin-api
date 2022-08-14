import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthEmployeeGuard } from 'src/pkg/user/guard/jwt-auth-employee.guard';
import { RoomStatus } from 'src/schemas/room-status.schema';
import { RequestDto } from 'src/utils/core/dto/request.dto';
import { ResponseDto } from 'src/utils/core/dto/response.dto';
import { CreateRoomStatusDto } from '../dto/create-room-status.dto';
import { UpdateRoomStatusDto } from '../dto/update-room-status.dto';
import { RoomStatusService } from '../service/room-status.service';
import { RoomService } from '../service/room.service';

@Controller('room-status')
@ApiTags('Room Status')
export class RoomStatusController {
  constructor(private readonly service: RoomStatusService) {}

  @UseGuards(JwtAuthEmployeeGuard)
  @Post()
  @ApiBearerAuth()
  @ApiBody({
    type: CreateRoomStatusDto
  })
  async create(@Body() formData: CreateRoomStatusDto): Promise<RoomStatus> {
    return this.service.create(formData);
  }

  @Post('search')
  @HttpCode(200)
  @ApiBody({
    type: RequestDto
  })
  async search(@Body() formData: RequestDto): Promise<ResponseDto<RoomStatus>> {
    const { pagination, query, sort } = formData;
    return this.service.search(pagination, query, sort);
  }

  @Post('list')
  @HttpCode(200)
  @ApiBody({
    type: RequestDto
  })
  async find(@Body() formData: RequestDto): Promise<ResponseDto<RoomStatus>> {
    const { pagination, query, sort } = formData;
    return this.service.find(pagination, query, sort);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
  })
  async findOne(@Param('id') id: string): Promise<RoomStatus> {
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
    type: UpdateRoomStatusDto
  })
  async update(@Param('id') id: string, @Body() formData: UpdateRoomStatusDto): Promise<RoomStatus> {
    return this.service.updateById(id, formData);
  }

  @UseGuards(JwtAuthEmployeeGuard)
  @Delete(':id')
  @HttpCode(204)
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiBearerAuth()
  async remove(@Param('id') id: string): Promise<void> {
    return this.service.removeById(id);
  }
}
