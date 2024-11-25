import { CategorieType, ClassType, TurnType } from '@prisma/client';

export class CreateStudentDto {
  name: string;
  categorie: CategorieType;
  class: ClassType;
  turn: TurnType;

  dataNascimento?: string;
  naturalidadeAluno?: string;
  endereco?: string;
  cep?: string;

  mae?: {
    nome: string;
    telefone: string;
    cpf?: string;
    rg?: string;
    naturalidade?: string;
  };

  pai?: {
    nome: string;
    telefone: string;
    cpf?: string;
    rg?: string;
    naturalidade?: string;
  };

  responsaveis?: Array<{
    nome: string;
    parentesco: string;
    telefone: string;
  }>;

  observacoes?: Array<{
    titulo: string;
    descricao: string;
  }>;
}
