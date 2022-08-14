import { USER_EMPLOYEE_COLLECTION } from '../../../schemas/constant';
import { MongoCoreService } from '../../../utils/core/abstract.mongo';
import { UserEmployee, UserEmployeeDocument } from '../../../schemas/user-employee.schema';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserEmployeeService extends MongoCoreService<UserEmployee> {
    constructor(
        @InjectModel(USER_EMPLOYEE_COLLECTION) public userModel: Model<UserEmployeeDocument>,
        private jwtService: JwtService,
    ) {
        super(userModel);
    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userModel.findOne({ username });
        if (!user) {
            throw new HttpException('Tài khoản này không tồn tại hoặc không có hiệu lực !', 404);
        }
        const { password: hash } = user;
        const result = await bcrypt.compare(password, hash);
        if (!result) {
            throw new HttpException('Mật khẩu không đúng !', 400);
        }
        return user;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user._id };
        return {
            token: this.jwtService.sign(payload),
            userId: user._id,
            username: user.username,
            employee: user.employee
        };
    }
}
