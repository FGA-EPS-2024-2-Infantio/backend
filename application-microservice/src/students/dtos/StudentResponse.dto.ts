import { CategorieType, ClassType, TurnType } from '@prisma/client';

export class StudentResponseDto {
  id: string;
  name: string;
  categorie: CategorieType;
  class: ClassType;
  turn: TurnType;
  school?: {
    id: string;
    name: string;
  };
  classes?: {
    id: string;
    name: string;
  }[];
}
