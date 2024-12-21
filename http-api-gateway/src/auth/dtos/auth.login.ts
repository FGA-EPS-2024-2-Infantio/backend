import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiProperty({ description: 'O nome de usuário (email) para login.' })
  @IsString()
  @IsEmail()
  username: string;

  @ApiProperty({ description: 'A senha para login.' })
  @IsString()
  password: string;
}
