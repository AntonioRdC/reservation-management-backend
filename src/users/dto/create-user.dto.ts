import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'john.doe@email.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty({ example: 'password' })
  password: string;
}
