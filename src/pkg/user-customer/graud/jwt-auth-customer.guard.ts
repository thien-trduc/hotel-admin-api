import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthCustomerGuard extends AuthGuard('customer-jwt') {}