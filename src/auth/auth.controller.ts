import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { User, VerificationToken } from '@prisma/client';

import { AuthService } from 'src/auth/auth.service';
import { ValidateUserDto } from 'src/auth/dto/validateUser.dto';
import { VerifyTokenDto } from './dto/verifyToken.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('validateUser')
  async validateUser(
    @Body() validateUserDto: ValidateUserDto,
  ): Promise<User | Error> {
    try {
      const validateUser = await this.authService.validateUser(validateUserDto);

      if (validateUser === null) {
        throw new HttpException(
          'This user does not exist',
          HttpStatus.BAD_REQUEST,
        );
      }

      return validateUser;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException(
          'This user does not exist',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (error.status) {
        throw new HttpException(error.message, error.status);
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('generateVerificationToken')
  async generateVerificationToken(
    @Body() verifyTokenDto: VerifyTokenDto,
  ): Promise<VerificationToken | Error> {
    try {
      console.log(verifyTokenDto);
      const verifiedToken = await this.authService.verifyToken(verifyTokenDto);

      return verifiedToken;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException(
          'This token does not exist',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (error.status) {
        throw new HttpException(error.message, error.status);
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
