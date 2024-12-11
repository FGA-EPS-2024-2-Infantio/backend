import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMonthlyPaymentDto {
  @IsNotEmpty()
  @IsString()
  studentId: string;

  @IsNotEmpty()
  @IsNumber()
  month: number;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsBoolean()
  payed: boolean;

  @IsNotEmpty()
  @IsNumber()
  value: number;
}
