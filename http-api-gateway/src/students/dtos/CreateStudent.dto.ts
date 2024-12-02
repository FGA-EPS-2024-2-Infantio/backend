import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CategorieType, ClassType, TurnType } from './Enums.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;
  
  @IsEnum(CategorieType)
  @IsNotEmpty()
  @ApiProperty()
  categorie: CategorieType;
  
  @IsEnum(ClassType)
  @IsNotEmpty()
  @ApiProperty()
  class: ClassType;
  
  @IsEnum(TurnType)
  @IsNotEmpty()
  @ApiProperty()
  turn: TurnType;
}
