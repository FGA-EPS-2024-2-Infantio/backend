import { CategorieType, ClassType, TurnType } from '@prisma/client';

export class CreateStudentDto {
  name: string;
  isFilled?: boolean;
  categorie: CategorieType; // Use a enumeração correta do Prisma
  class: ClassType; // Use a enumeração correta do Prisma
  turn: TurnType; // Use a enumeração correta do Prisma
  schoolId: string;

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

  observacoesMedicas?: {
    hospital?: string;
    telefoneHospital?: string;
    medico?: string;
    telefoneMedico?: string;
    enderecoHospital?: string;
    possuiConvenio?: boolean;
    alergias?: string;
    medicamentosFebre?: string;
    medicamentosVomito?: string;
    observacoesGerais?: string;
  };
}
