import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateClassDto } from './dtos/CreateClass.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Classes')
@Controller('classes')
export class ClassController {
  constructor(@Inject('NATS_SERVICE') private readonly natsClient: ClientProxy) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova turma.' })
  @ApiResponse({ status: 201, description: 'Turma criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Falha ao criar a turma.' })
  async createClass(@Body() createClassDto: CreateClassDto) {
    try {
      const response = await lastValueFrom(this.natsClient.send('createClass', createClassDto));
      return response;
    } catch (error) {
      throw new BadRequestException('Failed to create class', error);
    }
  }

  @Get(':userId/list')
  @ApiOperation({ summary: 'Listar todas as turmas de um usuário.' })
  @ApiResponse({ status: 200, description: 'Lista de turmas retornada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Falha ao listar as turmas.' })
  async listClasses(@Param('userId') userId: string) {
    try {
      const response = await this.natsClient.send('listClasses', { userId: userId });
      return response;
    } catch (error) {
      throw new BadRequestException('Failed to fetch classes', error);
    }
  }

  @Get(':classId')
  @ApiOperation({ summary: 'Obter detalhes de uma turma.' })
  @ApiResponse({ status: 200, description: 'Detalhes da turma retornados com sucesso.' })
  @ApiResponse({ status: 400, description: 'Falha ao obter os detalhes da turma.' })
  async getClass(@Param('classId') classId: string) {
    try {
      const response = await this.natsClient.send('getClass', classId);
      return response;
    } catch (error) {
      throw new BadRequestException(`Failed to fetch class with id ${classId}`, error);
    }
  }

  @Get(':classId/students')
  @ApiOperation({ summary: 'Obter todos os alunos de uma turma.' })
  @ApiResponse({ status: 200, description: 'Lista de alunos da turma retornada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Falha ao obter os alunos da turma.' })
  async getClassStudents(@Param('classId') classId: string) {
    return await lastValueFrom(this.natsClient.send('getClassStudents', classId));
  }

  @Delete(':classId')
  @HttpCode(200)
  @ApiOperation({ summary: 'Excluir uma turma.' })
  @ApiResponse({ status: 200, description: 'Turma excluída com sucesso.' })
  @ApiResponse({ status: 400, description: 'Falha ao excluir a turma.' })
  async deleteClass(@Param('classId') classId: string) {
    try {
      const response = await this.natsClient.send('disableClass', classId);
      return response;
    } catch (error) {
      throw new BadRequestException(`Failed to delete class with id ${classId}`, error);
    }
  }

  @Patch(':classId')
  @ApiOperation({ summary: 'Atualizar os dados de uma turma.' })
  @ApiResponse({ status: 200, description: 'Turma atualizada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Falha ao atualizar a turma.' })
  async updateClass(@Param('classId') classId: string, @Body() updateClassDto: CreateClassDto) {
    try {
      const response = await this.natsClient.send('updateClass', { data: updateClassDto, classId: classId });
      return response;
    } catch (error) {
      throw new BadRequestException(`Failed to update class with id ${classId}`, error);
    }
  }

  @Post(':classId/students')
  @ApiOperation({ summary: 'Atualizar os alunos de uma turma.' })
  @ApiResponse({ status: 200, description: 'Alunos atualizados na turma com sucesso.' })
  @ApiResponse({ status: 400, description: 'Falha ao atualizar os alunos da turma.' })
  async updateStudents(@Param('classId') classId: string, @Body() { studentIds }: { studentIds: string[] }) {
    try {
      const response = await this.natsClient.send('updateClassStudents', { classId, studentIds });
      return response;
    } catch (error) {
      throw new BadRequestException(`Failed to update students to class with id ${classId}`, error);
    }
  }
}
