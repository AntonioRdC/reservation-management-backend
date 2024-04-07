import { Strategy, Profile } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { UsersService } from 'src/module/users/users.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly usersService: UsersService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/redirect',
      passReqToCallback: true,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
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

      return user;
    }

    return user;
  }
}
