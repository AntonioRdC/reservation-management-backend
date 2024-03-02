import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ example: 'john.doe@email.com' })
  email: string;

  @ApiProperty({ example: 'password' })
  password: string;
}
