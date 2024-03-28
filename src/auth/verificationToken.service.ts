import { Injectable } from '@nestjs/common';
import { VerificationToken } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VerificationTokenService {
  constructor(private prismaService: PrismaService) {}

  async create(
    email: string,
    token: string,
    expires: Date,
  ): Promise<VerificationToken> {
    return await this.prismaService.verificationToken.create({
      data: { email, token, expires },
    });
  }

  async findFirstByEmail(email: string): Promise<VerificationToken> {
    return await this.prismaService.verificationToken.findFirst({
      where: { email },
    });
  }

  async findUniqueByToken(token: string): Promise<VerificationToken> {
    return await this.prismaService.verificationToken.findUniqueOrThrow({
      where: { token },
    });
  }

  async delete(id: string): Promise<VerificationToken> {
    return await this.prismaService.verificationToken.delete({
      where: { id },
    });
  }
}
