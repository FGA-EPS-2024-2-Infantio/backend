import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { CreateTeacherDto } from './dtos/CreateTeacher.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Teachers')
@Controller('teachers')
export class TeacherController {
  constructor(@Inject('NATS_SERVICE') private readonly natsClient: ClientProxy) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo professor.' })
  @ApiResponse({ status: 201, description: 'Professor criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro ao criar professor.' })
  async createTeacher(@Body() createTeacherDto: CreateTeacherDto) {
    try {
      const user = await firstValueFrom(
        this.natsClient.send('registerUser', {
          name: createTeacherDto.name,
          email: createTeacherDto.email,
          password: createTeacherDto.password,
          role: 'TEACHER',
        }),
      );

      const response = await lastValueFrom(
        this.natsClient.send('createTeacher', {
          name: createTeacherDto.name,
          numberOfClasses: createTeacherDto.numberOfClasses,
          cpf: createTeacherDto.cpf,
          startDate: createTeacherDto.startDate,
          userId: user.id,
          directorId: createTeacherDto.userId,
        }),
      );

      if (!response.success) {
        if (response.code === 'UNIQUE_CONSTRAINT') {
          throw new ConflictException(response.error || 'CPF already exists');
        }

        throw new HttpException(
          {
            success: false,
            error: response.error || 'An error occurred',
            code: response.code || 'UNKNOWN_ERROR',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      return response;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':userId/list')
  @ApiOperation({ summary: 'Listar todos os professores associados a um usuário.' })
  @ApiResponse({ status: 200, description: 'Lista de professores.' })
  @ApiResponse({ status: 400, description: 'Erro ao listar professores.' })
  async listTeacher(@Param('userId') userId: string) {
    try {
      const response = this.natsClient.send('listTeacher', { userId: userId });
      return response;
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  @Get(':teacherId')
  @ApiOperation({ summary: 'Obter detalhes de um professor.' })
  @ApiResponse({ status: 200, description: 'Detalhes do professor.' })
  @ApiResponse({ status: 400, description: 'Erro ao obter professor.' })
  async getTeacher(@Param('teacherId') teacherId: string) {
    try {
      const response = await this.natsClient.send('getTeacher', teacherId);
      return response;
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  @Get(':teacherId/classes')
  @ApiOperation({ summary: 'Obter as turmas de um professor.' })
  @ApiResponse({ status: 200, description: 'Turmas do professor.' })
  @ApiResponse({ status: 400, description: 'Erro ao obter turmas do professor.' })
  async getTeacherClasses(@Param('teacherId') teacherId: string) {
    try {
      const response = await lastValueFrom(this.natsClient.send('getTeacherClasses', teacherId));
      return response;
    } catch (error) {
      throw new BadRequestException(`Failed to retrieve classes for teacher ${teacherId}: ${error.message}`);
    }
  }

  @Delete(':teacherId')
  @HttpCode(200)
  @ApiOperation({ summary: 'Desabilitar um professor.' })
  @ApiResponse({ status: 200, description: 'Professor desabilitado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro ao desabilitar professor.' })
  async disableTeacher(@Param('teacherId') teacherId: string) {
    try {
      const response = this.natsClient.emit('disableTeacher', { teacherId: teacherId });
      return response;
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  @Patch(':teacherId')
  @ApiOperation({ summary: 'Atualizar os dados de um professor.' })
  @ApiResponse({ status: 200, description: 'Professor atualizado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro ao atualizar professor.' })
  async updateTeacher(@Param('teacherId') teacherId: string, @Body() updateTeacherDto: CreateTeacherDto) {
    try {
      const response = this.natsClient.emit('updateTeacher', { data: updateTeacherDto, teacherId: teacherId });
      return response;
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }
}
