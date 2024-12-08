import { IsEmail, IsEnum, IsString } from 'class-validator';

export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  DIRECTOR = 'DIRECTOR',
  USER = 'USER',
}

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(UserRole, {
    message: 'role must be one of: ADMIN, TEACHER, DIRECTOR, USER',
  })
  role: UserRole;
}
