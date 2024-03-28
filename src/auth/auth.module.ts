import { Module } from '@nestjs/common';

import { AuthService } from 'src/auth/auth.service';
import { AuthController } from 'src/auth/auth.controller';
import { UsersModule } from 'src/users/users.module';
import { VerificationTokenService } from 'src/auth/verificationToken.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [UsersModule, PrismaModule],
  providers: [AuthService, VerificationTokenService],
  controllers: [AuthController],
})
export class AuthModule {}
