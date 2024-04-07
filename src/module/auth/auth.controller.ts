import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Redirect,
  Session,
} from '@nestjs/common';

import { AuthService } from 'src/module/auth/auth.service';
import { User } from 'src/module/users/entity/users.entity';
import { LocalAuthGuard } from 'src/module/auth/guard/local-auth.guard';
import { GoogleAuthGuard } from 'src/module/auth/guard/google-oauth.guard';

interface AuthenticatedRequest extends Request {
  user: User;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login() {}

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async loginGoogle() {}

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  @Redirect('http://localhost:3000/auth/profile')
  async redirectGoogle() {}

  @Get('logout')
  async logout(@Session() session: Record<string, any>) {
    session.destroy();

    return session;
  }

  @Get('profile')
  async getProfile(@Request() req: AuthenticatedRequest) {
    return req.user;
  }
}
