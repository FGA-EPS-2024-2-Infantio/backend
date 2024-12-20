import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClassDto {
  @ApiProperty({ description: 'Nome da turma', example: 'Turma de Matemática' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'ID do usuário responsável pela turma', example: 'abc123' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ description: 'ID do professor da turma', example: 'def456' })
  @IsNotEmpty()
  @IsString()
  teacherId: string;

  @ApiProperty({ description: 'IDs dos alunos da turma', example: ['student1', 'student2'], required: false })
  @IsOptional()
  @IsString({ each: true })
  studentIds?: string[];

  @ApiProperty({ description: 'Indica se a turma está desabilitada', example: false, required: false })
  @IsOptional()
  @IsBoolean()
  disabled?: boolean;
}
