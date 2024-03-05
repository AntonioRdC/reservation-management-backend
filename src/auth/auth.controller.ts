import {
  Controller,
  Get,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { LocalAuthGuard } from './local-auth.guard';
import { GoogleAuthGuard } from './google-auth.guard';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 400, description: 'Bad Request' })
@ApiResponse({ status: 500, description: 'Internal Server Error' })
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiBody({ type: AuthDto })
  async LogIn(@Request() req: Request & { user: any }) {
    return this.authService.login(req.user);
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async GoogleLogIn(@Request() req: Request & { user: any }) {
    return this.authService.login(req.user);
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async GoogleRedirect() {
    return { msg: 'OK' };
  }

  @Get('status')
  user(@Request() req: Request & { user: any }) {
    if (req.user) {
      return { msg: 'Authenticated', user: req.user };
    } else {
      return { msg: 'Not Authenticated' };
    }
  }
}
