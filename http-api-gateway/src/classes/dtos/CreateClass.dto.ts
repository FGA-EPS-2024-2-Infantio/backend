import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClassDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  teacherId: string;

  @IsOptional()
  @IsString({ each: true })
  studentIds?: string[];

  @IsOptional()
  @IsBoolean()
  disabled?: boolean;
}
