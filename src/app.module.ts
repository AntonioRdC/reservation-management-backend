import { Module } from '@nestjs/common';

import { UsersModule } from 'src/module/users/users.module';
import { AuthModule } from 'src/module/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { VerificationTokenModule } from './module/verification-token/verification-token.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, VerificationTokenModule],
})
export class AppModule {}
