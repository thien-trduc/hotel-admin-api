import { RequestDto } from './../../utils/core/dto/request.dto';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Role } from 'src/schemas/role.schema';
import { RoleService } from './service/role.service';
import { HttpCode } from '@nestjs/common';
import { ResponseDto } from 'src/utils/core/dto/response.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('role')
@ApiTags('Role')
export class RoleController {
  constructor(private readonly service: RoleService) {}

  @Post()
  @ApiBody({
    type: CreateRoleDto
  })
  async create(@Body() formData: CreateRoleDto): Promise<Role> {
    return this.service.create(formData);
  }

  @Post('search')
  @HttpCode(200)
  @ApiBody({
    type: RequestDto
  })
  async search(@Body() formData: RequestDto): Promise<ResponseDto<Role>> {
    const { pagination, query, sort } = formData;
    return this.service.search(pagination, query, sort);
  }

  @Post('list')
  @HttpCode(200)
  @ApiBody({
    type: RequestDto
  })
  async find(@Body() formData: RequestDto): Promise<ResponseDto<Role>> {
    const { pagination, query, sort } = formData;
    return this.service.find(pagination, query, sort);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
  })
  async findOne(@Param('id') id: string): Promise<Role> {
    return this.service.findById(id);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiBody({
    type: UpdateRoleDto
  })
  async update(@Param('id') id: string, @Body() formData: UpdateRoleDto): Promise<Role> {
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
