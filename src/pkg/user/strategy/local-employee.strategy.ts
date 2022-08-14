import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, HttpException } from '@nestjs/common';
import { UserEmployeeService } from '../service/user-employee.service';

@Injectable()
export class LocalEmployeeStrategy extends PassportStrategy(Strategy, 'employee-local') {
  constructor(private service: UserEmployeeService) {
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