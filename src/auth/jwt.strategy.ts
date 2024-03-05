import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { Constants } from './constants';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Constants.secretJwt,
    });
  }

  async validate(payload: any) {
    try {
      const user = await this.authService.validateEmail(payload.email);

      if (!user) {
        throw new HttpException('Token is not valid!', HttpStatus.UNAUTHORIZED);
      }

      return { username: payload.username, email: payload.email, id: user.id };
    } catch (error) {}
  }
}
