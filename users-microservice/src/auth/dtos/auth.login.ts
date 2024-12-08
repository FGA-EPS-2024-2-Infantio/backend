import { IsEmail, IsString } from 'class-validator';

export class LoginDTO {
  @IsString()
  @IsEmail()
  username: string;

  @IsString()
  password: string;
}
