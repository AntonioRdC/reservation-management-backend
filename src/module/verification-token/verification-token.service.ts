import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/module/users/entity/users.entity';

@Injectable()
export class VerificationTokenService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async create(user: User) {
    const token = this.jwtService.sign({ email: user.email });
    const decoded = this.jwtService.decode(token);
    const expires = new Date(decoded.exp * 1000);

    const verificationToken = await this.prismaService.verificationToken.create(
      {
        data: { email: user.email, token, expires },
      },
    );

    return verificationToken;
  }

  findOne(id: number) {
    return `This action returns a #${id} verificationToken`;
  }

  remove(id: number) {
    return `This action removes a #${id} verificationToken`;
  }
}
