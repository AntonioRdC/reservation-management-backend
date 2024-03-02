import { Controller, Post, Request, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from './local-auth.guard';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 400, description: 'Bad Request' })
@ApiResponse({ status: 500, description: 'Internal Server Error' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signIn')
  @UseGuards(LocalAuthGuard)
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiBody({ type: AuthDto })
  async signIn(@Request() req: Request & { user: any }) {
    return this.authService.login(req.user);
  }
}
