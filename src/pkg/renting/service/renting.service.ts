import { HttpException, HttpStatus, Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Model } from 'mongoose';
import { BookingDetailService } from 'src/pkg/booking/service/booking-detail.service';
import { BookingService } from 'src/pkg/booking/service/booking.service';
import { CustomerService } from 'src/pkg/customer/service/customer.service';
import { RoomStatusEnum } from 'src/pkg/room/enums/room-status.enum';
import { RoomStatusService } from 'src/pkg/room/service/room-status.service';
import { RoomService } from 'src/pkg/room/service/room.service';
import { ServiceMongoService } from 'src/pkg/service-mongo/service/service-mongo.service';
import { BookingDetail } from 'src/schemas/booking-detail.schema';
import { CustomerDetailDocument } from 'src/schemas/customer-detail.schema';
import { ReceiptDocument } from 'src/schemas/receipt.schema';
import { Renting, RentingDocument } from 'src/schemas/renting.schema';
import { ServiceDetailDocument } from 'src/schemas/service-detail.schema';
import { MongoCoreService, Pagination } from 'src/utils/core/abstract.mongo';
import { CheckInGuestDto } from '../dto/checkin-guest.dto';
import { CheckInPreOrderDto } from '../dto/checkin-pre-order.dto';
import {
  CUSTOMER_DETAIL_COLLECTION,
  RECEIPT_COLLECTION,
  RENTING_COLLECTION,
  SERVICE_DETAIL_COLLECTION,
} from './../../../schemas/constant';
import { RentingDetailService } from './renting-detail.service';
import * as _ from 'lodash';
import { CustomerDetailService } from 'src/pkg/customer/service/customer-detail.service';
import { ReceiptService } from 'src/pkg/receipt/receipt.service';

@Injectable()
export class RentingService extends MongoCoreService<Renting> {

  private readonly logger: Logger = new Logger(RentingService.name);

  constructor(
    @InjectModel(RENTING_COLLECTION) private readonly rentingModel: Model<RentingDocument>,
    @Inject(forwardRef(() => BookingService)) private readonly bookingService: BookingService,
    private readonly customerService: CustomerService,
    private readonly customerDetailService: CustomerDetailService,
    private readonly rentingDetailService: RentingDetailService,
    private readonly roomService: RoomService,
    private readonly roomStatusService: RoomStatusService,
    private readonly bookingDetailService: BookingDetailService,
    private readonly receiptService: ReceiptService,
  ) {
    super(rentingModel);
  }

  async findByBookings(bookingIds: any[]): Promise<any> {
    try {
      return this.rentingModel
        .find({
          booking: {
            $in: [...bookingIds],
          },
        })
        .populate('booking')
        .sort({ _id: 'asc' })
        .exec();
    } catch (error) {
      throw error;
    }
  }

  // Case checkIn for guest user
  async checkInGuest(formData: CheckInGuestDto, employeeId: string): Promise<any> {
    const { roomId } = formData.rentingDetail;
    try {
      await Promise.all([
        this.fillDataCheckInGuest(formData, employeeId),
        this.afterCheckIn(roomId, RoomStatusEnum.RENTING),
      ]);
    } catch (error) {
      this.logger.error(`Error when exec checkInGuest. Cause: ${error.message}`);
      const message: string = 'Hiện tại hệ thống chưa thể xử lý yêu cầu này. Vui lòng thử lại sau!';
      throw new HttpException(message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  async fillDataCheckInGuest(formData: CheckInGuestDto, employeeId: string): Promise<any> {
    const { totalPrice, totalDiscount, valueDiscount, userId } = formData;
    const { checkInDate, checkOutDate, roomId, paymentStatus } = formData.rentingDetail;
    const toDay = moment(new Date()).toDate();
    try {
      // Step 1: Tạo phiếu thuê
      const renting = await this.rentingModel.create({
        totalPrice,
        totalDiscount,
        valueDiscount,
        employee: employeeId,
      });
      // Step 2: Tạo hóa đơn
      const user = await this.customerService.findById(userId);
      const bill = await this.receiptService.create({
        date: toDay,
        owner: user.fullName,
        totalPrice,
        employee: employeeId,
        renting: renting._id,
      });
      // Step 3: Tạo chi tiết phiếu thuê
      const rentingDetail = await this.rentingDetailService.create({
        checkInDate,
        checkOutDate,
        roomId,
        paymentStatus,
        renting: renting._id,
        billNumber: bill._id,
      });
      // Step 4: Tạo chi tiết khách thuê
      await this.customerDetailService.create({ customer: userId, rentingDetail: rentingDetail._id });
      return true;
    } catch (error) {
      this.logger.error(`Error when exec fillDataCheckInGuest. Cause: ${error.message}`);
      throw error;
    }
  }

  // Sau khi checkIn thành công
  async afterCheckIn(roomId: string, statusRoom: string): Promise<any> {
    try {
      const roomStatus = await this.roomStatusService.findOne({ status: statusRoom });
      return this.roomService.updateById(roomId, { roomStatus: roomStatus._id });
    } catch (error) {
      this.logger.error(`Error when exec afterCheckIn. Cause: ${error.message}`);
      throw error;
    }
  }

  async checkInPreOrder(formData: CheckInPreOrderDto, employeeId: string): Promise<any> {
    try {
      await this.fillCheckInPreOrder(formData, employeeId);
    } catch (error) {
      throw error;
    }
  }

  async fillCheckInPreOrder(formData: CheckInPreOrderDto, employeeId: string): Promise<any> {
    const { booking: idBooking, totalDiscount, valueDiscount } = formData;
    const toDay = moment(new Date()).toDate();
    try {
      // Step 1: Lấy thông tin phiếu đặt trước
      const booking = await this.bookingService.findById(idBooking);
      const { price: totalPrice, customer: userId, checkInDate, checkOutDate, status: paymentStatus } = booking;
      // Lấy thông tin chi tiết phiếu đặt để lấy thông tin phòng
      const bookingDetails = await this.bookingDetailService.findByBooking(idBooking);
      // Step 2: Tạo phiếu thuê
      const renting = await this.rentingModel.create({
        totalPrice,
        totalDiscount,
        valueDiscount,
        employee: employeeId,
        booking: idBooking,
      });
      // Step 3: Tạo hóa đơn
      const user = await this.customerService.findById(`${userId}`);
      const bill = await this.receiptService.create({
        date: toDay,
        owner: user.fullName,
        totalPrice,
        employee: employeeId,
        renting: renting._id,
      });
      // Step 4: Tạo chi tiết phiếu thuê
      await Promise.all(bookingDetails.map(async (bookingDetail: BookingDetail) => {
        // Lấy phòng với hạng tương ứng
        for (let i = 0; i < bookingDetail.quantity; i++) {
          const room = await this.roomService.findOneByRoomRankAlreadyBooking(`${bookingDetail.roomRank._id.toString()}`);
          const rentingDetail = await this.rentingDetailService.create({
            checkInDate,
            checkOutDate,
            room: room._id,
            paymentStatus,
            renting: renting._id,
            billNumber: bill._id,
          });
          await this.customerDetailService.create({ customer: userId, rentingDetail: rentingDetail._id })
          await this.afterCheckIn(room._id, RoomStatusEnum.RENTING);
        }
      }));
      await this.bookingService.updateBookingStatusAfterCheckIn(idBooking);
      return renting;
    } catch (error) {
      throw error;
    }
  }

  async checkout(rentingId: string, employeeId: string): Promise<any> {
    try {
      // Tìm lại phiếu thuê
      const [renting, rentingDetails] = await Promise.all([
        this.rentingModel.findById(rentingId).lean().exec(),
        this.rentingDetailService.findByRentings([rentingId])
      ])
      const userByRenting = await this.customerDetailService.findOne({ rentingDetail: `${_.first(rentingDetails)._id}` });
      const user = await this.customerService.findById(`${userByRenting.customer}`);
      // Lấy thông tin các dịch vụ sử dụng theo chi tiết phiếu thuê
      // const services = await this.serviceDetailModel.find({ rentingDetail: rentingDetail._id }).exec();
      // const totalPrice = services.reduce((total, service) => {
      //   return total + service.price;
      // }, 0);
      const toDay = moment().toDate();
      const bill = await this.receiptService.create({
        date: toDay,
        owner: user.fullName,
        totalPrice: renting.totalPrice,
        employee: employeeId,
        renting: renting._id,
      });
      await this.roomService.updateRoomForCheckOut(rentingDetails.map(detail => `${detail.room}`));
      await this.rentingModel.findByIdAndUpdate(rentingId, { status: 1 })
      return bill;
    } catch (error) {
      throw error;
    }
  }

  async findRentings(
    pagination: Pagination,
    query: any,
    sort: any,
  ): Promise<any> {
    try {
      const { pageIndex, pageSize } = pagination;
      let filter: any = {};
      let order: any = {};
      filter = !_.isEmpty(query) ? { ...filter, ...query } : filter;
      order = !_.isEmpty(sort) ? { ...order, ...sort } : { createdAt: 'desc' };
      const [rows, totalRows] = await Promise.all([
        this.model
          .find({ ...filter })
          .populate('employee')
          .populate({ path: 'booking', populate: { path: 'customer' } })
          .skip(pageIndex * pageSize)
          .limit(pageSize)
          .sort({ ...order })
          .exec(),
        this.model.countDocuments(),
      ]);
      return {
        pageIndex,
        pageSize,
        rows,
        totalRows
      }
    } catch (error) {
      throw error;
    }
  }

  async findByIdRenting(id: string): Promise<any> {
    try {
      const [renting, details] = await Promise.all([
        this.rentingModel.findById(id)
          .populate('employee')
          .populate({ path: 'booking', populate: { path: 'customer' } })
          .lean(),
        this.rentingDetailService.findByRentingPopulate(id),
      ]);
      return {
        ...renting,
        details,
      }
    } catch (error) {
      throw error;
    }
  }

  async searchRentings(pagination: Pagination,
    query: any,
    sort: any,): Promise<any> {
    try {
      const handleQuery = Object.entries(query).map(([key, value]) => {
        return { [key]: { $regex: '.*' + value + '.*' } };
      })
      const { pageIndex, pageSize } = pagination;
      let order: any = {};
      order = sort ? { ...order, ...sort } : { createdAt: 'desc' };

      const [rows, totalRows] = await Promise.all([
        this.model
          .find(_.first(handleQuery))
          .skip(pageIndex * pageSize)
          .populate('employee')
          .populate({ path: 'booking', populate: { path: 'customer' } })
          .limit(pageSize)
          .sort({ ...order })
          .exec(),
        this.model.countDocuments(),
      ])
      return {
        pageIndex,
        pageSize,
        rows,
        totalRows
      }
    } catch (error) {
      throw error;
    }
  }
}
