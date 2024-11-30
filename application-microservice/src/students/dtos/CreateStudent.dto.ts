import { CategorieType, ClassType, TurnType } from '@prisma/client';

export class CreateStudentDto {
  name: string;
  categorie: CategorieType;
  class: ClassType;
  turn: TurnType;
  schoolId: string;
}
