import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './../../schemas/employee.schema';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RequestDto } from 'src/utils/core/dto/request.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeService } from './service/employee.service';
import { ResponseDto } from 'src/utils/core/dto/response.dto';

@Controller('employee')
@ApiTags('Employee')
export class EmployeeController {
  constructor(private readonly service: EmployeeService) { }

  @Post()
  @ApiBody({
    type: CreateEmployeeDto
  })
  async create(@Body() formData: CreateEmployeeDto): Promise<Employee> {
    return this.service.create(formData);
  }

  @Post('search')
  @HttpCode(200)
  @ApiBody({
    type: RequestDto
  })
  async search(@Body() formData: RequestDto): Promise<ResponseDto<Employee>> {
    const { pagination, query, sort } = formData;
    return this.service.search(pagination, query, sort);
  }

  @Post('list')
  @HttpCode(200)
  @ApiBody({
    type: RequestDto
  })
  async find(@Body() formData: RequestDto): Promise<ResponseDto<Employee>> {
    const { pagination, query, sort } = formData;
    return this.service.find(pagination, query, sort);
  }

  @Post('list-by-department')
  @HttpCode(200)
  @ApiBody({
    type: RequestDto
  })
  @ApiQuery({
    name: 'idDeparment',
    type: String,
  })
  async findByDepartment(@Query('idDeparment') department: string, @Body() formData: RequestDto): Promise<ResponseDto<Employee>> {
    const { pagination, query, sort } = formData;
    return this.service.find(pagination, { ...query, department }, sort);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
  })
  async findOne(@Param('id') id: string): Promise<Employee> {
    return this.service.findById(id);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiBody({
    type: UpdateEmployeeDto
  })
  async update(@Param('id') id: string, @Body() formData: UpdateEmployeeDto): Promise<Employee> {
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
