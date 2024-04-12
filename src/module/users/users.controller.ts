import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';

import { VerificationTokenService } from 'src/module/verification-token/verification-token.service';
import { CreateUserDto } from 'src/module/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/module/users/dto/update-user.dto';
import { UsersService } from 'src/module/users/users.service';
import { sendConfirmationEmail } from 'src/common/email';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly verificationTokenService: VerificationTokenService,
  ) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);

      if (user.emailVerified) {
        return user;
      }

      const token = await this.verificationTokenService.create(user);

      await sendConfirmationEmail(user.email, token.token);

      return { ...user, idToken: token.id };
    } catch (error) {
      if (error.status) {
        throw new BadRequestException('Email já existe');
      }
      if (error.code === 'P2002') {
        throw new BadRequestException('Email já existe');
      }

      throw new InternalServerErrorException('Erro no servidor');
    }
  }

  @Get()
  @HttpCode(200)
  async findMany() {
    try {
      const users = await this.usersService.findMany();

      return users;
    } catch (error) {
      throw new InternalServerErrorException('Erro no servidor');
    }
  }

  @Get(':id')
  @HttpCode(200)
  async findUnique(@Param('id') id: string) {
    try {
      const user = await this.usersService.findUniqueOrThrow(id);

      return user;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Id não existe');
      }

      throw new InternalServerErrorException('Erro no servidor');
    }
  }

  @Patch(':id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = await this.usersService.update(id, updateUserDto);

      return user;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Id não existe');
      }

      throw new InternalServerErrorException('Erro no servidor');
    }
  }

  @Delete(':id')
  @HttpCode(202)
  async remove(@Param('id') id: string) {
    try {
      await this.usersService.remove(id);

      return;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Id não existe');
      }

      throw new InternalServerErrorException('Erro no servidor');
    }
  }
}
