import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-cookie';

import { AuthService } from '../services';

@Injectable()
export class CookieStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      cookieName: 'session-token',
    });
  }

  async validate(token: string | undefined) {
    const user = await this.authService.validateUserPayload(token);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
