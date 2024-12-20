import { ApiProperty } from '@nestjs/swagger';

export class SchoolResponseDto {
  @ApiProperty({ description: 'ID da escola', example: 'abc123' })
  id: string;

  @ApiProperty({ description: 'Nome da escola', example: 'Escola Modelo' })
  name: string;

  @ApiProperty({ description: 'E-mail do diretor', example: 'diretor@escola.com' })
  directorEmail: string;

  @ApiProperty({ description: 'Número de estudantes', example: 250 })
  numberStudents: number;
}
