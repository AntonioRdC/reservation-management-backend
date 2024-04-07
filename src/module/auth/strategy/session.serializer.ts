import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { UsersService } from 'src/module/users/users.service';
import { User } from 'src/module/users/entity/users.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: User, done: (err: Error, user: User) => void) {
    done(null, user);
  }

  async deserializeUser(payload: any, done: (err: Error, user: User) => void) {
    const user = await this.usersService.findOne(payload.id);
    return user ? done(null, user) : done(null, null);
  }
}
