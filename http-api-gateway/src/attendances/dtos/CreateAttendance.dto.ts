import { IsNotEmpty, IsString, IsDate, IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAttendanceDto {
  @ApiProperty({ description: 'ID do estudante', example: '12345' })
  @IsNotEmpty()
  @IsString()
  studentId: string;

  @ApiProperty({ description: 'ID da turma', example: '67890' })
  @IsString()
  @IsNotEmpty()
  classId: string;

  @ApiProperty({ description: 'Indica se o aluno esteve presente', example: true })
  @IsNotEmpty()
  @IsBoolean()
  hasAttended: boolean;

  @ApiProperty({ description: 'Data da presença', example: '2024-12-01T10:00:00Z' })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  date: Date;

  @ApiProperty({ description: 'Horário de entrada', example: '2024-12-01T08:00:00Z', required: false })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  entryTime?: Date;

  @ApiProperty({ description: 'Horário de saída', example: '2024-12-01T17:00:00Z', required: false })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  exitTime?: Date;
}
