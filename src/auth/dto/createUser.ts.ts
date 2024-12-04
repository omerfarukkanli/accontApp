import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ default: 'test@gmail.com' })
  email: string;
  @ApiProperty({ default: 'password' })
  password: string;
}
