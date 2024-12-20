import { IsEmail, IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  DIRECTOR = 'DIRECTOR',
  USER = 'USER',
}

export class CreateUserDto {
  @ApiProperty({ description: 'Nome do usuário.' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Email do usuário.' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Senha do usuário.' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'Papel do usuário.', enum: UserRole })
  @IsEnum(UserRole, { message: 'role must be one of: ADMIN, TEACHER, DIRECTOR, USER' })
  role: UserRole;
}
