import { Body, Controller, Delete, Get, HttpCode, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthCustomerGuard } from 'src/pkg/user-customer/graud/jwt-auth-customer.guard';
import { JwtAuthEmployeeGuard } from 'src/pkg/user/guard/jwt-auth-employee.guard';
import { Booking } from 'src/schemas/booking.schema';
import { RequestDto } from 'src/utils/core/dto/request.dto';
import { ResponseDto } from 'src/utils/core/dto/response.dto';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { BookingService } from '../service/booking.service';

@Controller('booking')
@ApiTags('Booking')
export class BookingController {
  constructor(private readonly service: BookingService) {}

  @Post('reserve')
  @UseGuards(JwtAuthCustomerGuard)
  @ApiBearerAuth()
  @ApiBody({
    type: CreateBookingDto,
  })
  @ApiOperation({ summary: 'BookingControllerReserveBooking(formData: CreateBookingDto, authorization)' })
  async reserveBooking(@Req() req, @Body() formData: CreateBookingDto): Promise<any> {
    return this.service.reserveBooking(req.user, formData);
  }

  @Post('list')
  @UseGuards(JwtAuthEmployeeGuard)
  @HttpCode(200)
  async findBookings( @Body() formData: RequestDto): Promise<ResponseDto<Booking>> {
      const { pagination, query, sort } = formData;
      return this.service.findBookings(pagination,query, sort);
  }

  @Post('search')
  @UseGuards(JwtAuthEmployeeGuard)
  @HttpCode(200)
  async searchBookings( @Body() formData: RequestDto): Promise<ResponseDto<Booking>> {
      const { pagination, query, sort } = formData;
      return this.service.searchBookings(pagination,query, sort);
  }

  @Get(':id')
  async findByIdBooking(@Param('id') id: string): Promise<any> {
    return this.service.findByIdBooking(id);
  }

  // @UseGuards(JwtAuthEmployeeGuard)
  // @Delete(':id')
  // @HttpCode(204)
  // async remove(@Param('id') id: string): Promise<void> {
  //   return this.service.removeById(id);
  // }
}
