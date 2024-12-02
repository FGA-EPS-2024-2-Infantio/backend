import { ApiProperty } from '@nestjs/swagger';
import { CategorieType, ClassType, TurnType } from './Enums.dto';

export class StudentResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'INTEGRAL', enum: CategorieType })
  categorie: string;

  @ApiProperty({ example: 'ESCOLA', enum: ClassType })
  class: string;

  @ApiProperty({ example: 'MATUTINO', enum: TurnType })
  turn: string;

  @ApiProperty({ example: false })
  disabled: boolean;

  @ApiProperty({ example: '2024-11-25T12:00:00.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2024-11-25T12:00:00.000Z' })
  updatedAt: string;

  @ApiProperty({ example: null })
  disabledAt: string | null;
}

export class StudentDisabledResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'INTEGRAL', enum: CategorieType })
  categorie: string;

  @ApiProperty({ example: 'ESCOLA', enum: ClassType })
  class: string;

  @ApiProperty({ example: 'MATUTINO', enum: TurnType })
  turn: string;

  @ApiProperty({ example: true })
  disabled: boolean;

  @ApiProperty({ example: '2024-11-25T12:00:00.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2024-11-25T12:00:00.000Z' })
  updatedAt: string;

  @ApiProperty({ example: null })
  disabledAt: string | null;
}
