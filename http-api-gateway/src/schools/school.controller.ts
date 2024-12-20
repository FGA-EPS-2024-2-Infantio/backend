import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateSchoolDto } from './dtos/CreateSchool.dto';
import { SchoolResponseDto } from './dtos/SchoolResponse.dto';

@ApiTags('Escolas')
@Controller('schools')
export class SchoolsController {
  constructor(@Inject('NATS_SERVICE') private readonly natsClient: ClientProxy) {}

  @Post()
  @ApiOperation({ summary: 'Registrar uma nova escola' })
  @ApiResponse({ status: 201, description: 'Escola criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos para criação da escola.' })
  @ApiBody({ type: CreateSchoolDto })
  async createSchool(@Body() createSchoolDto: CreateSchoolDto) {
    const user = await firstValueFrom(
      this.natsClient.send('registerUser', {
        name: createSchoolDto.directorName,
        email: createSchoolDto.directorEmail,
        password: createSchoolDto.directorPassword,
        role: 'DIRECTOR',
      }),
    );

    this.natsClient.emit('createSchool', {
      name: createSchoolDto.name,
      directorEmail: createSchoolDto.directorEmail,
      numberStudents: createSchoolDto.numberStudents,
      userId: user.id,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as escolas' })
  @ApiResponse({ status: 200, description: 'Lista de escolas recuperada com sucesso.', type: [SchoolResponseDto] })
  async listSchools() {
    return await this.natsClient.send('listSchool', {});
  }

  @Get(':schoolId')
  @ApiOperation({ summary: 'Obter detalhes de uma escola pelo ID' })
  @ApiParam({ name: 'schoolId', description: 'ID da escola' })
  @ApiResponse({ status: 200, description: 'Detalhes da escola recuperados com sucesso.', type: SchoolResponseDto })
  @ApiResponse({ status: 404, description: 'Escola não encontrada.' })
  async getSchool(@Param('schoolId') schoolId: string) {
    return await this.natsClient.send('getSchool', schoolId);
  }

  @Get(':schoolId/classes')
  @ApiOperation({ summary: 'Listar turmas de uma escola pelo ID' })
  @ApiParam({ name: 'schoolId', description: 'ID da escola' })
  @ApiResponse({ status: 200, description: 'Turmas recuperadas com sucesso.' })
  @ApiResponse({ status: 404, description: 'Escola não encontrada.' })
  async getSchoolClasses(@Param('schoolId') schoolId: string) {
    return await lastValueFrom(this.natsClient.send('getSchoolClasses', schoolId));
  }

  @Get(':schoolId/students')
  @ApiOperation({ summary: 'Listar estudantes de uma escola pelo ID' })
  @ApiParam({ name: 'schoolId', description: 'ID da escola' })
  @ApiResponse({ status: 200, description: 'Estudantes recuperados com sucesso.' })
  @ApiResponse({ status: 404, description: 'Escola não encontrada.' })
  async getSchoolStudents(@Param('schoolId') schoolId: string) {
    return await lastValueFrom(this.natsClient.send('getSchoolStudents', schoolId));
  }

  @Get(':schoolId/teachers')
  @ApiOperation({ summary: 'Listar professores de uma escola pelo ID' })
  @ApiParam({ name: 'schoolId', description: 'ID da escola' })
  @ApiResponse({ status: 200, description: 'Professores recuperados com sucesso.' })
  @ApiResponse({ status: 404, description: 'Escola não encontrada.' })
  async getSchoolTeachers(@Param('schoolId') schoolId: string) {
    return await lastValueFrom(this.natsClient.send('getSchoolTeachers', schoolId));
  }

  @Delete(':schoolId')
  @ApiOperation({ summary: 'Desativar uma escola pelo ID' })
  @ApiParam({ name: 'schoolId', description: 'ID da escola a ser desativada' })
  @ApiResponse({ status: 200, description: 'Escola desativada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Escola não encontrada.' })
  async disableSchool(@Param('schoolId') schoolId: string) {
    this.natsClient.emit('disableSchool', schoolId);
  }

  @Patch(':schoolId')
  @ApiOperation({ summary: 'Atualizar dados de uma escola pelo ID' })
  @ApiParam({ name: 'schoolId', description: 'ID da escola a ser atualizada' })
  @ApiBody({ type: CreateSchoolDto })
  @ApiResponse({ status: 200, description: 'Escola atualizada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Escola não encontrada.' })
  updateSchool(@Param('schoolId') schoolId: string, @Body() updateSchoolDto: CreateSchoolDto) {
    this.natsClient.emit('updateSchool', { data: updateSchoolDto, schoolId: schoolId });
  }
}
