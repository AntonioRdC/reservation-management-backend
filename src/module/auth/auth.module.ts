import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from 'src/module/auth/auth.service';
import { AuthController } from 'src/module/auth/auth.controller';
import { UsersModule } from 'src/module/users/users.module';
import { LocalStrategy } from 'src/module/auth/strategy/local.strategy';
import { GoogleStrategy } from 'src/module/auth/strategy/google.strategy';
import { jwtConstants } from 'src/common/config/constants';
import { JwtStrategy } from 'src/module/auth/strategy/jwt.strategy';
import { VerificationTokenModule } from 'src/module/verification-token/verification-token.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, GoogleStrategy, JwtStrategy],
  imports: [
    UsersModule,
    VerificationTokenModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
})
export class AuthModule {}
