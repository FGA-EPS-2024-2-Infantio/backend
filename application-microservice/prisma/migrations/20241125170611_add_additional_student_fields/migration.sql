-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "cep" TEXT,
ADD COLUMN     "dataNascimento" TIMESTAMP(3),
ADD COLUMN     "endereco" TEXT,
ADD COLUMN     "mae" JSONB,
ADD COLUMN     "naturalidadeAluno" TEXT,
ADD COLUMN     "observacoes" JSONB,
ADD COLUMN     "observacoesMedicas" JSONB,
ADD COLUMN     "pai" JSONB,
ADD COLUMN     "responsaveis" JSONB;
