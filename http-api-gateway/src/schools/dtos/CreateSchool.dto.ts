import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateSchoolDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  directorName: string;

  @IsString()
  @IsNotEmpty()
  directorEmail: string;

  @IsString()
  @IsNotEmpty()
  directorPassword: string;

  @IsInt()
  @IsNotEmpty()
  numberStudents: number;
}
