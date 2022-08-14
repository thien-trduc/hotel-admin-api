import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Renting } from 'src/schemas/renting.schema';
import { RequestDto } from 'src/utils/core/dto/request.dto';
import { ResponseDto } from 'src/utils/core/dto/response.dto';
import { JwtAuthEmployeeGuard } from '../user/guard/jwt-auth-employee.guard';
import { CheckInGuestDto } from './dto/checkin-guest.dto';
import { CheckInPreOrderDto } from './dto/checkin-pre-order.dto';
import { CheckOutDto } from './dto/checkout.dto';
import { RentingService } from './service/renting.service';

@Controller('renting')
@ApiBearerAuth()
export class RentingController {
  constructor(private readonly rentingService: RentingService) {}

  @Post('list')
  @UseGuards(JwtAuthEmployeeGuard)
  @HttpCode(200)
  async findRentings( @Body() formData: RequestDto): Promise<ResponseDto<Renting>> {
      const { pagination, query, sort } = formData;
      return this.rentingService.findRentings(pagination,query, sort);
  }

  @Post('search')
  @UseGuards(JwtAuthEmployeeGuard)
  @HttpCode(200)
  async searchRentings(@Body() formData: RequestDto): Promise<ResponseDto<Renting>> {
      const { pagination, query, sort } = formData;
      return this.rentingService.searchRentings(pagination,query, sort);
  }

  @Post('check-in-guest')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'CheckIn dành cho khách vãng lai', description: 'CheckIn dành cho khách vãng lai' })
  @UseGuards(AuthGuard('employee-jwt'))
  async checkInGuest(@Body() formData: CheckInGuestDto, @Req() req): Promise<any> {
    return this.rentingService.checkInGuest(formData, req.user.userId);
  }

  @Post('check-in-booking')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'CheckIn dành cho khách đã đặt trước', description: 'CheckIn dành cho khách đã đặt trước' })
  @UseGuards(AuthGuard('employee-jwt'))
  async checkInPreOrder(@Body() formData: CheckInPreOrderDto, @Req() req): Promise<any> {
    return this.rentingService.checkInPreOrder(formData, req.user.userId);
  }

  @Post('check-out')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Checkout', description: 'Checkout' })
  @UseGuards(AuthGuard('employee-jwt'))
  async checkout(@Body() formData: CheckOutDto, @Req() req): Promise<any> {
    return this.rentingService.checkout(formData.rentingId, req.user.userId);
  }

  @Get(':id')
  async findByIdRenting(@Param('id') id: string): Promise<any> {
    return this.rentingService.findByIdRenting(id);
  }
}
