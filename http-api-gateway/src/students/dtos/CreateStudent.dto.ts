import { IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CategorieType, ClassType, TurnType } from './Enums.dto';

class ParentDataDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  telefone: string;

  @IsString()
  @IsOptional()
  cpf?: string;

  @IsString()
  @IsOptional()
  rg?: string;

  @IsString()
  @IsOptional()
  naturalidade?: string;
}

class ResponsavelDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  parentesco: string;

  @IsString()
  @IsNotEmpty()
  telefone: string;
}

class ObservacaoDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;
}

class ObservacoesMedicasDto {
  @IsString()
  @IsOptional()
  hospital?: string;

  @IsString()
  @IsOptional()
  telefoneHospital?: string;

  @IsString()
  @IsOptional()
  medico?: string;

  @IsString()
  @IsOptional()
  telefoneMedico?: string;

  @IsString()
  @IsOptional()
  enderecoHospital?: string;

  @IsOptional()
  possuiConvenio?: boolean;

  @IsString()
  @IsOptional()
  alergias?: string;

  @IsString()
  @IsOptional()
  medicamentosFebre?: string;

  @IsString()
  @IsOptional()
  medicamentosVomito?: string;

  @IsString()
  @IsOptional()
  observacoesGerais?: string;
}

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

  @IsOptional()
  dataNascimento?: Date;

  @IsString()
  @IsOptional()
  naturalidadeAluno?: string;

  @IsString()
  @IsOptional()
  endereco?: string;

  @IsString()
  @IsOptional()
  cep?: string;

  @ValidateNested()
  @Type(() => ParentDataDto)
  @IsOptional()
  mae?: ParentDataDto;

  @ValidateNested()
  @Type(() => ParentDataDto)
  @IsOptional()
  pai?: ParentDataDto;

  @ValidateNested({ each: true })
  @Type(() => ResponsavelDto)
  @IsOptional()
  responsaveis?: ResponsavelDto[];

  @ValidateNested({ each: true })
  @Type(() => ObservacaoDto)
  @IsOptional()
  observacoes?: ObservacaoDto[];

  @ValidateNested({ each: true })
  @Type(() => ObservacoesMedicasDto)
  @IsOptional()
  observacoesMedicas?: ObservacoesMedicasDto;
}
