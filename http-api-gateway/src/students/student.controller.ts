import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateStudentDto } from './dtos/CreateStudent.dto';

@ApiTags('Estudantes')
@Controller('students')
export class StudentsController {
  constructor(@Inject('NATS_SERVICE') private readonly natsClient: ClientProxy) {}

  @Post()
  @ApiOperation({ summary: 'Criar um estudante', description: 'Endpoint para criar um novo estudante.' })
  @ApiBody({ type: CreateStudentDto })
  @ApiResponse({ status: 201, description: 'Estudante criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro na validação dos dados.' })
  async createStudent(@Body() createStudentDto: CreateStudentDto) {
    return await this.natsClient.send('createStudent', createStudentDto);
  }

  @Get(':userId/list')
  @ApiOperation({ summary: 'Listar estudantes', description: 'Lista todos os estudantes de um usuário específico.' })
  @ApiParam({ name: 'userId', description: 'ID do usuário.', type: String })
  @ApiResponse({ status: 200, description: 'Lista de estudantes retornada com sucesso.' })
  async listStudent(@Param('userId') userId: string) {
    return await this.natsClient.send('listStudent', { userId: userId });
  }

  @Get(':studentId')
  @ApiOperation({ summary: 'Obter informações do estudante', description: 'Retorna os detalhes de um estudante específico.' })
  @ApiParam({ name: 'studentId', description: 'ID do estudante.', type: String })
  @ApiResponse({ status: 200, description: 'Detalhes do estudante retornados com sucesso.' })
  @ApiResponse({ status: 404, description: 'Estudante não encontrado.' })
  async getStudent(@Param('studentId') studentId: string) {
    return await this.natsClient.send('getStudent', studentId);
  }

  @Patch(':studentId')
  @ApiOperation({ summary: 'Atualizar informações do estudante', description: 'Atualiza os dados de um estudante.' })
  @ApiParam({ name: 'studentId', description: 'ID do estudante.', type: String })
  @ApiBody({ type: CreateStudentDto })
  @ApiResponse({ status: 200, description: 'Estudante atualizado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro na validação dos dados.' })
  @ApiResponse({ status: 404, description: 'Estudante não encontrado.' })
  async updateStudent(@Param('studentId') studentId: string, @Body() updateStudentDto: CreateStudentDto) {
    const response = await lastValueFrom(
      this.natsClient.send('updateStudent', { data: updateStudentDto, studentId: studentId }),
    );

    if (response?.statusCode && response?.statusCode !== HttpStatus.OK) {
      throw new HttpException(response.message, response.statusCode);
    }

    return response;
  }

  @Delete(':studentId')
  @ApiOperation({ summary: 'Desativar estudante', description: 'Desativa o cadastro de um estudante.' })
  @ApiParam({ name: 'studentId', description: 'ID do estudante.', type: String })
  @ApiResponse({ status: 200, description: 'Estudante desativado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Estudante não encontrado.' })
  async disableStudent(@Param('studentId') studentId: string) {
    return await this.natsClient.send('disableStudent', studentId);
  }
}
