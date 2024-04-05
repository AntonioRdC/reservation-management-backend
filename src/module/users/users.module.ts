import { Module } from '@nestjs/common';

import { UsersService } from 'src/module/users/users.service';
import { UsersController } from 'src/module/users/users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
