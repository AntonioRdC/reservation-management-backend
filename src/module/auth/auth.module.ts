import { Module } from '@nestjs/common';

import { AuthService } from 'src/module/auth/auth.service';
import { AuthController } from 'src/module/auth/auth.controller';
import { UsersModule } from 'src/module/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  imports: [UsersModule, PassportModule],
})
export class AuthModule {}
