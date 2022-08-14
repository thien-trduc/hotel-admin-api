import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthEmployeeGuard extends AuthGuard('employee-jwt') {}