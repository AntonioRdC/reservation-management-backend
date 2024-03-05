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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
@ApiResponse({ status: 500, description: 'Internal Server Error' })
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 400, description: 'Bad Request' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Created' })
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

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({ status: 200, description: 'Ok' })
  async findAll(): Promise<User[]> {
    const findAllUser = await this.usersService.findAll();
    return findAllUser;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
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

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Ok' })
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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Ok' })
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
