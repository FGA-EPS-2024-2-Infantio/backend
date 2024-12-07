import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTeacherDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  numberOfClasses: number;

  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  startDate: Date;
}
