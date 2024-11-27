import { CategorieType, ClassType, MonthlyPayment, TurnType } from '@prisma/client';

export class StudentResponseDto {
  id: string;
  name: string;
  categorie: CategorieType;
  class: ClassType;
  turn: TurnType;
  payments: MonthlyPayment[];
}
