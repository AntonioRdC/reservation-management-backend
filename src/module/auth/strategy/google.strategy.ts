import { Strategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { UsersService } from 'src/module/users/users.service';
import { AuthService } from 'src/module/auth/auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACKURL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    const profileJson = profile._json;
    const user = await this.usersService.findOneByEmail(profileJson.email);

    if (!user) {
      const user = await this.usersService.createGoogle({
        name: profileJson.name,
        email: profileJson.email,
        emailVerified: new Date().toISOString(),
        image: profileJson.picture,
        password: null,
      });

      const token = this.authService.login(user);

      return done(null, token);
    }

    const token = this.authService.login(user);

    return done(null, token);
  }
}
