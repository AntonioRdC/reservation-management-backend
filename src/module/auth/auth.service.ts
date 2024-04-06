import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';

import { UsersService } from 'src/module/users/users.service';
import { User } from 'src/module/users/entity/users.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

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
}
