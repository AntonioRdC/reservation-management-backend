import { Module } from '@nestjs/common';

import { UsersService } from 'src/module/users/users.service';
import { UsersController } from 'src/module/users/users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PrismaModule],
})
export class UsersModule {}
