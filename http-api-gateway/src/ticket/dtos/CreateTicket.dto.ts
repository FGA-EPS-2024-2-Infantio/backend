import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {IsNotEmpty, IsOptional, IsString } from 'class-validator';


export class CreateTicketDto {
  @ApiProperty({ description: 'Título do ticket.' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Mensagem do ticket.' })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiPropertyOptional({ description: 'Resposta ao ticket.' })
  @IsOptional()
  @IsString()
  response?: string;

  @ApiProperty({ description: 'Status do ticket.' })
  @IsNotEmpty()
  @IsString()
  status: 'OPEN' | 'CLOSED';

  @ApiProperty({ description: 'ID do diretor associado ao ticket.' })
  @IsNotEmpty()
  @IsString()
  directorId: string;

  @ApiProperty({ description: 'Nome do diretor.' })
  @IsNotEmpty()
  @IsString()
  directorName: string;

  @ApiPropertyOptional({ description: 'ID do admin associado ao ticket.' })
  @IsOptional()
  @IsString()
  adminId?: string;

}
