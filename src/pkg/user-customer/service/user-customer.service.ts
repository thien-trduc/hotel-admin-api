import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER_CUSTOMER_COLLECTION } from 'src/schemas/constant';
import { UserCustomer, UserCustomerDocument } from 'src/schemas/user-customer.schema';
import { MongoCoreService } from 'src/utils/core/abstract.mongo';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginSocialDto } from '../dto/login-social.dto';
import { CustomerService } from 'src/pkg/customer/service/customer.service';


@Injectable()
export class UserCustomerService extends MongoCoreService<UserCustomer> {
    constructor(
        @InjectModel(USER_CUSTOMER_COLLECTION) public userModel: Model<UserCustomerDocument>,
        private jwtService: JwtService,
        private customerService: CustomerService,
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
            customer: user.customer,
        };
    }

    async findWithCustomerById(id: string): Promise<any> {
        return (await this.userModel.findById(id).populate('customer').exec()).toObject();
    }

    async loginSocial(formData: LoginSocialDto): Promise<any> {
        const existUserCustomer = await this.userModel.exists({username: formData.email});
        if (!existUserCustomer) {
            const newCustomer = await this.customerService.create({
                idCard: formData.id,
                fullName: `${formData.lastName} ${formData.lastName}`,
                phone: ``,
                address: ``,
                email: `${formData.lastName} ${formData.lastName}`,
            })
            const userNew = new this.userModel({
                customer: `${newCustomer._id}`,
                avatar: formData.photoUrl,
                username: formData.email,
                password: formData.id
            })
            await userNew.save();
        }
        const user = await this.userModel.findOne({ username:  formData.email });
        if (!user) {
            throw new HttpException('Tài khoản này không tồn tại hoặc không có hiệu lực !', 404);
        }
        const payload = { username: user.username, sub: user._id };
        return {
            token: this.jwtService.sign(payload),
            userId: user._id,
            username: user.username,
            customer: user.customer,
        };
    }
}
