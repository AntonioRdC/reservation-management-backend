import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'John Doe', required: false })
  name: string;

  @ApiProperty({ example: 'john.doe@email.com', required: false })
  email: string;

  @ApiProperty({ example: 'password', required: false })
  password: string;
}
