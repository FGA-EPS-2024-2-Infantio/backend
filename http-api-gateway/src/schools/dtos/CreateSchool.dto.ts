import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSchoolDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  directorName: string;

  @IsOptional()
  @IsString()
  directorEmail: string;

  @IsOptional()
  @IsString()
  directorPassword: string;

  @IsInt()
  @IsNotEmpty()
  numberStudents: number;
}
