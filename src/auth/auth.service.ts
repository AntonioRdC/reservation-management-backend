import { Injectable } from '@nestjs/common';
import { User, VerificationToken } from '@prisma/client';
import { compare } from 'bcrypt';
import { v4 as uuid } from 'uuid';

import { UsersService } from '../users/users.service';
import { VerificationTokenService } from './verificationToken.service';
import { VerifyTokenDto } from './dto/verifyToken.dto';
import { ValidateUserDto } from './dto/validateUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly verificationTokenService: VerificationTokenService,
  ) {}

  async validateUser(validateUserDto: ValidateUserDto): Promise<User> {
    const user = await this.usersService.findByEmail(validateUserDto.email);
    const passwordMatch = await compare(
      validateUserDto.password,
      user.password,
    );

    if (user && user.password && passwordMatch) {
      return user;
    }

    return null;
  }

  async verifyToken(
    verifyTokenDto: VerifyTokenDto,
  ): Promise<VerificationToken> {
    const existingToken = await this.verificationTokenService.findFirstByEmail(
      verifyTokenDto.email,
    );
    if (existingToken) {
      await this.verificationTokenService.findFirstByEmail(existingToken.id);
    }

    const token = uuid();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const verficationToken = await this.verificationTokenService.create(
      verifyTokenDto.email,
      token,
      expires,
    );

    return verficationToken;
  }
}
