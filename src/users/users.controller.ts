import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { User } from '@prisma/client';

import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = await this.usersService.create(createUserDto);

      return createdUser;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException(
          'This email is already in use',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(@Query() updateUserDto: UpdateUserDto): Promise<User[]> {
    const findAllUser = await this.usersService.findAll(updateUserDto);
    return findAllUser;
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    try {
      const findById = await this.usersService.findById(id);
      return findById;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException(
          'This user does not exist',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    try {
      const updateUser = await this.usersService.update(id, updateUserDto);
      return updateUser;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException(
          'This user does not exist',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (error.code === 'P2002') {
        throw new HttpException(
          'This email is already in use',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    try {
      const removeUser = await this.usersService.remove(id);
      return removeUser;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException(
          'This user does not exist',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
