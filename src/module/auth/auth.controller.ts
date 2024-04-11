import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Req,
  Query,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';

import { AuthService } from 'src/module/auth/auth.service';
import { User } from 'src/module/users/entity/users.entity';
import { LocalAuthGuard } from 'src/module/auth/guard/local-auth.guard';
import { GoogleAuthGuard } from 'src/module/auth/guard/google-oauth.guard';
import { JwtAuthGuard } from 'src/module/auth/guard/jwt-auth.guard';

interface AuthenticatedRequest extends Request {
  user: User;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async loginGoogle() {}

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async redirectGoogle(@Req() req) {
    return req.user;
  }

  @Get('logout')
  async logout() {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: AuthenticatedRequest) {
    return req.user;
  }

  @Get('verification-token')
  async verificationTokenUser(@Query() qs) {
    try {
      const updatedUser = await this.authService.validateEmailUser(qs);

      if (!updatedUser) {
        throw new BadRequestException(`Token não é valido`);
      }

      return updatedUser.id;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new BadRequestException(`Token não é valido`);
      }

      throw new InternalServerErrorException('Erro no servidor');
    }
  }
}
