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
  HttpCode,
} from '@nestjs/common';

import { GoogleAuthGuard } from 'src/module/auth/guard/google-oauth.guard';
import { LocalAuthGuard } from 'src/module/auth/guard/local-auth.guard';
import { JwtAuthGuard } from 'src/module/auth/guard/jwt-auth.guard';
import { User } from 'src/module/users/entity/users.entity';
import { AuthService } from 'src/module/auth/auth.service';

interface AuthenticatedRequest extends Request {
  user: User;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(201)
  async login(@Request() req) {
    try {
      const user = this.authService.login(req.user);

      return user;
    } catch (error) {
      throw new InternalServerErrorException('Erro no servidor');
    }
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async loginGoogle() {}

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async redirectGoogle(@Req() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: AuthenticatedRequest) {
    return req.user;
  }

  @Get('verification-token')
  async verificationTokenUser(@Query() qs) {
    try {
      const updatedUser = await this.authService.verificationTokenUser(qs);

      return updatedUser;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new BadRequestException(`Token não é valido`);
      }

      throw new InternalServerErrorException('Erro no servidor');
    }
  }
}
