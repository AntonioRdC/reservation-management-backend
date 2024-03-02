import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async validateEmail(email: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      return user;
    }

    return null;
  }

  async login(user: any) {
    console.log(user);
    const payload = { username: user.name, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
