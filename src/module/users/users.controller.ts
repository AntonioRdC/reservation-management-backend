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

import { UsersService } from 'src/module/users/users.service';
import { CreateUserDto } from 'src/module/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/module/users/dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);

      return user;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Email already in use');
      }

      throw new InternalServerErrorException('Internal Error Server');
    }
  }

  @Get()
  @HttpCode(200)
  async findAll() {
    try {
      const users = await this.usersService.findAll();

      return users;
    } catch (error) {
      throw new InternalServerErrorException('Internal Error Server');
    }
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.usersService.findOne(id);

      return user;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with id '${id}' not found`);
      }

      throw new InternalServerErrorException('Internal Error Server');
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
        throw new NotFoundException(`User with id '${id}' not found`);
      }

      throw new InternalServerErrorException('Internal Error Server');
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
        throw new NotFoundException(`User with id '${id}' not found`);
      }

      throw new InternalServerErrorException('Internal Error Server');
    }
  }
}
