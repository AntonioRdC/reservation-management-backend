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
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
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
  @ApiResponse({ status: 200, description: 'Ok' })
  async findAll(): Promise<User[]> {
    const findAllUser = await this.usersService.findAll();
    return findAllUser;
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  async findOne(@Param('id') id: string): Promise<User> {
    try {
      const findUser = await this.usersService.findOne(id);
      return findUser;
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
  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiBody({ type: UpdateUserDto })
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
  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
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
