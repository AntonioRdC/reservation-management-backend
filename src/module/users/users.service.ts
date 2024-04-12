import { BadRequestException, Injectable } from '@nestjs/common';
import { hash, genSalt } from 'bcrypt';

import { CreateUserDto } from 'src/module/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/module/users/dto/update-user.dto';
import { User } from 'src/module/users/entity/users.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await genSalt(10);
    const hashedPassword = await hash(createUserDto.password, salt);

    const user = await this.findUniqueByEmail(createUserDto.email);

    if (user) {
      if (user.googleProvider && user.password) {
        throw new BadRequestException('Email já existe');
      }
      const updatedUser = await this.update(user.id, {
        password: hashedPassword,
      });

      return updatedUser;
    }

    const createdUser = await this.prismaService.user.create({
      data: { ...createUserDto, password: hashedPassword },
    });

    return createdUser;
  }

  async createGoogle(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.prismaService.user.create({
      data: createUserDto,
    });

    return createdUser;
  }

  async findMany(): Promise<User[]> {
    const allUsers = await this.prismaService.user.findMany({});

    return allUsers;
  }

  async findUniqueOrThrow(id: string): Promise<User> {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: { id },
    });

    return user;
  }

  async findUnique(id: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    return user;
  }

  async findUniqueByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });

    return updatedUser;
  }

  async remove(id: string): Promise<User> {
    const deletedUser = await this.prismaService.user.delete({
      where: { id },
    });

    return deletedUser;
  }
}
