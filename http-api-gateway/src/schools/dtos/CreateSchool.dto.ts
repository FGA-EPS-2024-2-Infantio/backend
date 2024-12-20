import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSchoolDto {
  @ApiProperty({ description: 'Nome da escola', example: 'Escola Modelo' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Nome do diretor', example: 'João da Silva', required: false })
  @IsOptional()
  @IsString()
  directorName: string;

  @ApiProperty({ description: 'E-mail do diretor', example: 'diretor@escola.com', required: false })
  @IsOptional()
  @IsString()
  directorEmail: string;

  @ApiProperty({ description: 'Senha do diretor', example: 'senha123', required: false })
  @IsOptional()
  @IsString()
  directorPassword: string;

  @ApiProperty({ description: 'Número de estudantes', example: 250 })
  @IsInt()
  @IsNotEmpty()
  numberStudents: number;
}
