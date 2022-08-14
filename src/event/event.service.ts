import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { SENDGRID_CONNECTION } from 'src/config/sendgridConnection';
import { OnEvent } from '@nestjs/event-emitter';
import { TopicEvent } from './constant';
import { BookingService } from 'src/pkg/booking/service/booking.service';
import { BookingDetailService } from 'src/pkg/booking/service/booking-detail.service';
import { UserCustomerService } from 'src/pkg/user-customer/service/user-customer.service';
import { CustomerService } from 'src/pkg/customer/service/customer.service';
import * as fs from 'fs';
import * as path from 'path';
import { currencyFormat, dateFormat } from 'src/utils/utils';
import { SendgridConfigService } from 'src/config/config.sendgrid.sevice';
import { BookingMailHtml } from 'src/utils/template-mail/booking-mail';
import * as SendGrid from '@sendgrid/mail';


@Injectable()
export class EventService {
            // @Inject(SENDGRID_CONNECTION) private readonly sendgrid,

    constructor(
        private readonly sendgridConfigService: SendgridConfigService,
        private readonly bookingService: BookingService,
        private readonly bookingDetailService: BookingDetailService,
        private readonly userCustomerService: UserCustomerService,
        private readonly customerService: CustomerService,
    ) { 
        SendGrid.setApiKey(this.sendgridConfigService.getApiKey());
    }

    @OnEvent(TopicEvent.MAIL_BOOKING)
    async sendMailReceipt(data: any): Promise<any> {
        try {
            const { userId, bookingId } = data;
            const [user, booking, bookingDetails] = await Promise.all([
                this.userCustomerService.findWithCustomerById(userId),
                this.bookingService.findById(bookingId),
                this.bookingDetailService.findByBooking(bookingId),
            ]);
            // const htmlData = fs.readFileSync('/client/mail-template/booking-mail.html', { encoding: 'utf8', flag: 'r' });
            const htmlData = BookingMailHtml;

            const htmlRoomRankDetail = `<tr class="service">
            <td class="tableitem"><p class="itemtext">{ROOMRANKNAME}</p></td>
            <td class="tableitem"><p class="itemtext">{ROOMRANKQUANTITY}</p></td>
            <td class="tableitem"><p class="itemtext">{ROOMRANKPRICE}</p></td>
            </tr>`;
            let htmlRoomRankDetails = ``;
            for (const detail of bookingDetails) {
                const htmdetail = htmlRoomRankDetail;
                htmlRoomRankDetails += htmdetail.replace('{ROOMRANKNAME}', detail.roomRank.name)
                    .replace('{ROOMRANKQUANTITY}', detail.quantity)
                    .replace('{ROOMRANKPRICE}', detail.totalPrice);
            };

            const html = htmlData.replace('{MAPĐ}', booking.bookingCode)
                .replace('{HOTEN}', user.customer.fullName)
                .replace('{DIENTHOAI}', user.customer.phone)
                .replace('{CHECKIN}', dateFormat(booking.checkInDate.toISOString()))
                .replace('{CHECKOUT}', dateFormat(booking.checkInDate.toISOString()))
                .replace('{DATAROOMRANK}', htmlRoomRankDetails)
                .replace('{TONGTIEN}', `${currencyFormat(booking.price)}`);

            const sender = this.sendgridConfigService.getSender();
            console.log(sender)
            const receiver = user.username;
            const dataSendgrid = {
                to: receiver,
                from:sender ,
                subject: `Đặt phòng khách sạn`,
                html,
            }
            await this.send(dataSendgrid);
        } catch (error) {
            throw error;
        }
    }

    async send(mail: SendGrid.MailDataRequired) {
        const transport = await SendGrid.send(mail);
        // avoid this on production. use log instead :)
        console.log(`E-Mail sent to ${mail.to}`);
        return transport;
      }
}
