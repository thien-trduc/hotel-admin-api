import { UpdateDepartmentDto } from './dto/update-department.dto';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { DepartmentService } from './service/department.service';
import { Department } from 'src/schemas/department.schema';
import { ResponseDto } from 'src/utils/core/dto/response.dto';
import { RequestDto } from 'src/utils/core/dto/request.dto';

@Controller('department')
@ApiTags('Department')
export class DepartmentController {
  constructor(private readonly service: DepartmentService) {}

  @Post()
  @ApiBody({
    type: CreateDepartmentDto
  })
  async create(@Body() formData: CreateDepartmentDto): Promise<Department> {
    return this.service.create(formData);
  }

  @Post('search')
  @HttpCode(200)
  @ApiBody({
    type: RequestDto
  })
  async search(@Body() formData: RequestDto): Promise<ResponseDto<Department>> {
    const { pagination, query, sort } = formData;
    return this.service.search(pagination, query, sort);
  }

  @Post('list')
  @HttpCode(200)
  @ApiBody({
    type: RequestDto
  })
  async find(@Body() formData: RequestDto): Promise<ResponseDto<Department>> {
    const { pagination, query, sort } = formData;
    return this.service.find(pagination, query, sort);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
  })
  async findOne(@Param('id') id: string): Promise<Department> {
    return this.service.findById(id);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiBody({
    type: UpdateDepartmentDto
  })
  async update(@Param('id') id: string, @Body() formData: UpdateDepartmentDto): Promise<Department> {
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
