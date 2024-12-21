import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTeacherDto {
  @ApiProperty({ description: 'Nome do professor.' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Email do professor.' })
  @IsString()
  @IsOptional()
  email: string;

  @ApiPropertyOptional({ description: 'Senha do professor.' })
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty({ description: 'Número de turmas que o professor leciona.' })
  @IsNumber()
  @IsNotEmpty()
  numberOfClasses: number;

  @ApiProperty({ description: 'CPF do professor.' })
  @IsNotEmpty()
  @IsString()
  cpf: string;

  @ApiProperty({ description: 'Data de início do professor.' })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @ApiPropertyOptional({ description: 'ID do usuário associado ao professor.' })
  @IsOptional()
  @IsString()
  userId: string;
}
