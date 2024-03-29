import { Injectable } from '@nestjs/common';
import { hash, genSalt } from 'bcrypt';
import { User } from '@prisma/client';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const saltRounds = 10;
    const salt = await genSalt(saltRounds);
    const hashedPassword = await hash(createUserDto.password, salt);

    return await this.prismaService.user.create({
      data: { ...createUserDto, password: hashedPassword },
    });
  }

  async findAll(updateUserDto: UpdateUserDto): Promise<User[]> {
    return await this.prismaService.user.findMany({ where: updateUserDto });
  }

  async findById(id: string): Promise<User> {
    return await this.prismaService.user.findUniqueOrThrow({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.prismaService.user.findUniqueOrThrow({
      where: { email },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string): Promise<User> {
    return await this.prismaService.user.delete({
      where: { id },
    });
  }
}
