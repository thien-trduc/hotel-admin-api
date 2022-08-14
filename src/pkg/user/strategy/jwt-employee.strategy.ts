import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtUserEmployeeConfigService } from 'src/config/config.jwt-user-employee.service';

@Injectable()
export class JwtEmployeeStrategy extends PassportStrategy(Strategy, 'employee-jwt') {
  constructor(private config: JwtUserEmployeeConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getEmployeeJwtSecret(),
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}