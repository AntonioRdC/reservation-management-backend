import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    const passwordMatch = await compare(pass, user.password);

    if (user && passwordMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async validateUserGoogle(details: any) {
    const user = await this.usersService.findByEmail(details.email);

    if (user) return user;

    return this.usersService.create({
      email: details.email,
      name: details.displayName,
      password: 'password',
    });
  }

  async validateEmail(email: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      return user;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.name, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
