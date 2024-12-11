import {
  CategorieType,
  ClassType,
  MonthlyPayment,
  TurnType,
} from '@prisma/client';

export class StudentResponseDto {
  id: string;
  name: string;
  isFilled: boolean;
  categorie: CategorieType;
  class: ClassType;
  turn: TurnType;
  payments: MonthlyPayment[];
  school?: {
    id: string;
    name: string;
  };
  classes?: {
    id: string;
    name: string;
  }[];
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

  disabled?: boolean;
  disabledAt?: Date;
}
