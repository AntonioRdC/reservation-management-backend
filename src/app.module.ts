import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/module/users/users.module';
import { AuthModule } from 'src/module/auth/auth.module';
import { VerificationTokenModule } from 'src/module/verification-token/verification-token.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, VerificationTokenModule],
})
export class AppModule {}
