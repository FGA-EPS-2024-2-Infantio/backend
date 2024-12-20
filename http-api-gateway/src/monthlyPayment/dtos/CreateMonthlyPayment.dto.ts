import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMonthlyPaymentDto {
  @ApiProperty({ description: 'ID do aluno', example: 'abc123' })
  @IsNotEmpty()
  @IsString()
  studentId: string;

  @ApiProperty({ description: 'Mês do pagamento (1-12)', example: 5 })
  @IsNotEmpty()
  @IsNumber()
  month: number;

  @ApiProperty({ description: 'Ano do pagamento', example: 2024 })
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiProperty({ description: 'Indica se o pagamento foi concluído', example: true })
  @IsNotEmpty()
  @IsBoolean()
  payed: boolean;

  @ApiProperty({ description: 'Valor do pagamento', example: 150.75 })
  @IsNotEmpty()
  @IsNumber()
  value: number;
}
