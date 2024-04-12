import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { jwtConstants } from 'src/common/config/constants';
import { VerificationTokenService } from 'src/module/verification-token/verification-token.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [VerificationTokenService],
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  exports: [VerificationTokenService],
})
export class VerificationTokenModule {}
