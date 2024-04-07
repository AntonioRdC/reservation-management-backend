import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from 'src/module/auth/auth.service';
import { AuthController } from 'src/module/auth/auth.controller';
import { UsersModule } from 'src/module/users/users.module';
import { LocalStrategy } from 'src/module/auth/strategy/local.strategy';
import { GoogleStrategy } from 'src/module/auth/strategy/google.strategy';
import { SessionSerializer } from 'src/module/auth/strategy/session.serializer';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, GoogleStrategy, SessionSerializer],
  imports: [UsersModule, PassportModule.register({ session: true })],
})
export class AuthModule {}
