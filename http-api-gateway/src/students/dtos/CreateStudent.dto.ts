import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CategorieType, ClassType, TurnType } from './Enums.dto';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEnum(CategorieType)
  @IsNotEmpty()
  categorie: CategorieType;

  @IsEnum(ClassType)
  @IsNotEmpty()
  class: ClassType;

  @IsEnum(TurnType)
  @IsNotEmpty()
  turn: TurnType;
}
