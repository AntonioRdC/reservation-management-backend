import { Module } from '@nestjs/common';

import { UsersController } from 'src/module/users/users.controller';
import { UsersService } from 'src/module/users/users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { VerificationTokenModule } from '../verification-token/verification-token.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PrismaModule, VerificationTokenModule],
  exports: [UsersService],
})
export class UsersModule {}
