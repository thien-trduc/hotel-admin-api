import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, HttpException } from '@nestjs/common';
import { UserCustomerService } from '../../user-customer/service/user-customer.service';

@Injectable()
export class LocalCustomerStrategy extends PassportStrategy(Strategy, 'customer-local') {
  constructor(private service: UserCustomerService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.service.validateUser(username, password);
    if (!user) {
      throw new HttpException('Tài khoản không đúng ! Xin kiểm tra lại !',401);
    }
    return user;
  }
}