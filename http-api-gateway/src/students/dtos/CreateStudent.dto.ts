import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CategorieType, ClassType, TurnType } from './Enums.dto';

class ParentDataDto {
  @ApiPropertyOptional({ description: 'Nome do responsável.' })
  @IsString()
  @IsOptional()
  nome: string;

  @ApiPropertyOptional({ description: 'Telefone do responsável.' })
  @IsString()
  @IsOptional()
  telefone: string;

  @ApiPropertyOptional({ description: 'CPF do responsável.' })
  @IsString()
  @IsOptional()
  cpf?: string;

  @ApiPropertyOptional({ description: 'RG do responsável.' })
  @IsString()
  @IsOptional()
  rg?: string;

  @ApiPropertyOptional({ description: 'Naturalidade do responsável.' })
  @IsString()
  @IsOptional()
  naturalidade?: string;
}

class ResponsavelDto {
  @ApiPropertyOptional({ description: 'Nome do responsável.' })
  @IsString()
  @IsOptional()
  nome: string;

  @ApiPropertyOptional({ description: 'Parentesco do responsável.' })
  @IsString()
  @IsOptional()
  parentesco: string;

  @ApiPropertyOptional({ description: 'Telefone do responsável.' })
  @IsString()
  @IsOptional()
  telefone: string;
}

class ObservacaoDto {
  @ApiPropertyOptional({ description: 'Título da observação.' })
  @IsString()
  @IsOptional()
  titulo: string;

  @ApiPropertyOptional({ description: 'Descrição da observação.' })
  @IsString()
  @IsOptional()
  descricao: string;
}

class ObservacoesMedicasDto {
  @ApiPropertyOptional({ description: 'Hospital onde o aluno recebe atendimento.' })
  @IsString()
  @IsOptional()
  hospital?: string;

  @ApiPropertyOptional({ description: 'Telefone do hospital.' })
  @IsString()
  @IsOptional()
  telefoneHospital?: string;

  @ApiPropertyOptional({ description: 'Médico responsável pelo aluno.' })
  @IsString()
  @IsOptional()
  medico?: string;

  @ApiPropertyOptional({ description: 'Telefone do médico.' })
  @IsString()
  @IsOptional()
  telefoneMedico?: string;

  @ApiPropertyOptional({ description: 'Endereço do hospital.' })
  @IsString()
  @IsOptional()
  enderecoHospital?: string;

  @ApiPropertyOptional({ description: 'Indica se o aluno possui convênio médico.' })
  @IsOptional()
  possuiConvenio?: boolean;

  @ApiPropertyOptional({ description: 'Alergias do aluno.' })
  @IsString()
  @IsOptional()
  alergias?: string;

  @ApiPropertyOptional({ description: 'Medicamentos para febre do aluno.' })
  @IsString()
  @IsOptional()
  medicamentosFebre?: string;

  @ApiPropertyOptional({ description: 'Medicamentos para vômito do aluno.' })
  @IsString()
  @IsOptional()
  medicamentosVomito?: string;

  @ApiPropertyOptional({ description: 'Observações gerais sobre a saúde do aluno.' })
  @IsString()
  @IsOptional()
  observacoesGerais?: string;
}

export class CreateStudentDto {
  @ApiProperty({ description: 'Nome do estudante.' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'ID do usuário ao qual o estudante pertence.' })
  @IsOptional()
  @IsString()
  userId: string;

  @ApiProperty({ enum: CategorieType, description: 'Categoria do estudante.' })
  @IsEnum(CategorieType)
  @IsNotEmpty()
  categorie: CategorieType;

  @ApiProperty({ enum: ClassType, description: 'Tipo de classe do estudante.' })
  @IsEnum(ClassType)
  @IsNotEmpty()
  class: ClassType;

  @ApiProperty({ enum: TurnType, description: 'Turno de estudo do estudante.' })
  @IsEnum(TurnType)
  @IsNotEmpty()
  turn: TurnType;

  @ApiPropertyOptional({ description: 'Data de nascimento do estudante.' })
  @IsOptional()
  @IsString()
  dataNascimento?: string;

  @ApiPropertyOptional({ description: 'Naturalidade do estudante.' })
  @IsString()
  @IsOptional()
  naturalidadeAluno?: string;

  @ApiPropertyOptional({ description: 'Endereço do estudante.' })
  @IsString()
  @IsOptional()
  endereco?: string;

  @ApiPropertyOptional({ description: 'CEP do endereço do estudante.' })
  @IsString()
  @IsOptional()
  cep?: string;

  @ApiPropertyOptional({ description: 'Informações sobre a mãe do estudante.' })
  @ValidateNested()
  @Type(() => ParentDataDto)
  @IsOptional()
  mae?: ParentDataDto;

  @ApiPropertyOptional({ description: 'Informações sobre o pai do estudante.' })
  @ValidateNested()
  @Type(() => ParentDataDto)
  @IsOptional()
  pai?: ParentDataDto;

  @ApiPropertyOptional({
    type: [ResponsavelDto],
    description: 'Lista de responsáveis pelo estudante.',
  })
  @ValidateNested({ each: true })
  @Type(() => ResponsavelDto)
  @IsOptional()
  responsaveis?: ResponsavelDto[];

  @ApiPropertyOptional({
    type: [ObservacaoDto],
    description: 'Observações sobre o estudante.',
  })
  @ValidateNested({ each: true })
  @Type(() => ObservacaoDto)
  @IsOptional()
  observacoes?: ObservacaoDto[];

  @ApiPropertyOptional({
    type: [ObservacoesMedicasDto],
    description: 'Observações médicas sobre o estudante.',
  })
  @ValidateNested({ each: true })
  @Type(() => ObservacoesMedicasDto)
  @IsOptional()
  observacoesMedicas?: ObservacoesMedicasDto;
}
