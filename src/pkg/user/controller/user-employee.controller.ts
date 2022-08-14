import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserEmployee } from 'src/schemas/user-employee.schema';
import { RequestDto } from 'src/utils/core/dto/request.dto';
import { ResponseDto } from 'src/utils/core/dto/response.dto';
import { CreateUserEmployeeDto } from '../dto/create-user-employee.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { LocalEmployeeAuthGuard } from '../guard/local-auth-employee.guard';
import { UserEmployeeService } from '../service/user-employee.service';

@Controller('user-employees')
@ApiTags('UserEmployee')
export class UserEmployeeController {
  constructor(private readonly service: UserEmployeeService) {}

  @Post()
  @ApiBody({
    type: CreateUserEmployeeDto
  })
  async create(@Body() formData: CreateUserEmployeeDto): Promise<UserEmployee> {
    return this.service.create(formData);
  }

  @UseGuards(LocalEmployeeAuthGuard)
  @Post('/login')
  @ApiBody({
    type: LoginUserDto
  })
  async login(@Request() req) {
      return this.service.login(req.user);
  }

  @Post('search')
  @HttpCode(200)
  @ApiBody({
    type: RequestDto
  })
  async search(@Body() formData: RequestDto): Promise<ResponseDto<UserEmployee>> {
    const { pagination, query, sort } = formData;
    return this.service.search(pagination, query, sort);
  }

  @Post('list')
  @HttpCode(200)
  @ApiBody({
    type: RequestDto
  })
  async find(@Body() formData: RequestDto): Promise<ResponseDto<UserEmployee>> {
    const { pagination, query, sort } = formData;
    return this.service.find(pagination, query, sort);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserEmployee> {
    return this.service.findById(id);
  }

  @Put(':id')
  @ApiBody({
    type: UpdateUserDto
  })
  async update(@Param('id') id: string, @Body() formData: UpdateUserDto): Promise<UserEmployee> {
    return this.service.updateById(id, formData);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void> {
    return this.service.removeById(id);
  }
}
