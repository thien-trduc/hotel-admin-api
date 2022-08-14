import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigRepoService } from 'src/config/config.repo.service';
import { JwtUserCustomerConfigService } from 'src/config/config.jwt-user-customer.service';

@Injectable()
export class JwtCustomerStrategy extends PassportStrategy(Strategy, 'customer-jwt') {
  constructor(private config: JwtUserCustomerConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getCustomerJwtSecret(),
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}