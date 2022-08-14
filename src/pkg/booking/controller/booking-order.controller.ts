import { CreateBookingOrderDto } from './../dto/create-booking-order.dto';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthCustomerGuard } from 'src/pkg/user-customer/graud/jwt-auth-customer.guard';
import { BookingOrder } from 'src/schemas/booking-order.schema';
import { RequestDto } from 'src/utils/core/dto/request.dto';
import { ResponseDto } from 'src/utils/core/dto/response.dto';
import { BookingOrderService } from '../service/booking-order.service';
import { BookingService } from '../service/booking.service';

@Controller('booking-order')
@ApiTags('Booking Order')
export class BookingOrderController {
    constructor(
        private service: BookingOrderService,
        private bookingService: BookingService,
    ) { }


    @Post('list')
    @UseGuards(JwtAuthCustomerGuard)
    @HttpCode(200)
    @ApiBearerAuth()
    @ApiBody({
        type: RequestDto
    })
    @ApiOperation({summary: 'BookingOrderControllerFind(formData: RequestDto, authorization)'})
    async find(@Req() req, @Body() formData: RequestDto): Promise<ResponseDto<BookingOrder>> {
        const { pagination, query, sort } = formData;
        return this.service.findBookingOrderUser(pagination, { ...query, user: req.user }, sort);
    }

    @Post()
    @UseGuards(JwtAuthCustomerGuard)
    @ApiBearerAuth()
    @ApiBody({
        type: CreateBookingOrderDto,
    })
    @ApiOperation({summary: 'BookingOrderControllerCreate(formData: RequestDto, authorization)'})
    async create(@Body() formData: CreateBookingOrderDto): Promise<any> {
        return this.bookingService.createBookingOrder(formData);
    }

    @Delete(':id')
    @HttpCode(204)
    async deleteById(@Param('id') id: string): Promise<any> {
        return this.service.removeById(id);
    }
}