import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { UsersService } from 'src/module/users/users.service';
import { User } from 'src/module/users/entity/users.entity';
import { VerificationTokenService } from 'src/module/verification-token/verification-token.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private verificationTokenService: VerificationTokenService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);

    if (user) {
      const result = await compare(password, user.password);
      if (result) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;

        return result;
      }
      return null;
    }

    return null;
  }

  async login(user: User) {
    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      image: user.image,
      role: user.role,
    };
    const token = await this.jwtService.sign(payload);

    return {
      access_token: token,
    };
  }

  async validateEmailUser(qs: { token: string }): Promise<User> {
    const token = await this.jwtService.decode(qs.token);
    const user = await this.usersService.findOneByEmail(token.email);

    const updatedUser = await this.usersService.update(user.id, {
      emailVerified: new Date().toISOString(),
    });

    await this.verificationTokenService.remove(updatedUser.email);

    return updatedUser;
  }
}
