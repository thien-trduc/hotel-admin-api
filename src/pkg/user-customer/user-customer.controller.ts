import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, Param, Post, Put, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserCustomer } from 'src/schemas/user-customer.schema';
import { RequestDto } from 'src/utils/core/dto/request.dto';
import { ResponseDto } from 'src/utils/core/dto/response.dto';
import { CreateUserCustomerDto } from './dto/create-user-customer.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { UserCustomerService } from './service/user-customer.service';
import { LocalCustomerAuthGuard } from './graud/local-auth-customer.guard';
import { LoginSocialDto } from './dto/login-social.dto';

@Controller('user-customers')
@ApiTags('UserCustomer')
export class UserCustomerController {
  constructor(private readonly service: UserCustomerService) {}

  @Post()
  @ApiBody({
    type: CreateUserCustomerDto
  })
  async create(@Body() formData: CreateUserCustomerDto): Promise<UserCustomer> {
    return this.service.create(formData);
  }


  @UseGuards(LocalCustomerAuthGuard)
  @Post('/login')
  @ApiBody({
    type: LoginUserDto,
  })
  async login(@Request() req) {
      return this.service.login(req.user);
  }

  @Post('search')
  @HttpCode(200)
  @ApiBody({
    type: RequestDto
  })
  async search(@Body() formData: RequestDto): Promise<ResponseDto<UserCustomer>> {
    const { pagination, query, sort } = formData;
    return this.service.search(pagination, query, sort);
  }

  @Post('list')
  @HttpCode(200)
  @ApiBody({
    type: RequestDto
  })
  async find(@Body() formData: RequestDto): Promise<ResponseDto<UserCustomer>> {
    const { pagination, query, sort } = formData;
    return this.service.find(pagination, query, sort);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserCustomer> {
    return this.service.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() formData: UpdateUserDto): Promise<UserCustomer> {
    return this.service.updateById(id, formData);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void> {
    return this.service.removeById(id);
  }

  @Post('login-with-social')
  async loginWithSocial(@Body() formData: LoginSocialDto): Promise<any> {
     return this.service.loginSocial(formData);
  }
}
