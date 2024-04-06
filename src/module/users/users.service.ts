import { Injectable } from '@nestjs/common';
import { hash, genSalt } from 'bcrypt';

import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/module/users/entity/users.entity';
import { CreateUserDto } from 'src/module/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/module/users/dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await genSalt(10);
    const hashedPassword = await hash(createUserDto.password, salt);

    const createdUser = await this.prismaService.user.create({
      data: { ...createUserDto, password: hashedPassword },
    });

    return createdUser;
  }

  async findAll(): Promise<User[]> {
    const allUsers = await this.prismaService.user.findMany({});

    return allUsers;
  }

  async findOne(id: string): Promise<User | null> {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: { id },
    });

    return user;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: { email },
    });

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
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
