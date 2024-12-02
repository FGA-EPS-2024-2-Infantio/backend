import { HttpException, HttpStatus, Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateStudentDto } from './dtos/CreateStudent.dto';
import { StudentResponseDto } from './dtos/StudentResponse.dto';
import { SuccessCreateResponseDto, SuccessDisableResponseDto, SuccessUpdateResponseDto } from './dtos/SuccessResponse.dto';
import { ValidationErrorResponseDto, NotFoundErrorResponseDto } from './dtos/ErrorResponse.dto';
import { lastValueFrom } from 'rxjs';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) { }

  @Post()
  @ApiOperation({ summary: 'Cria um estudante' })
  @ApiResponse({
    status: 201,
    description: 'Estudante criado com sucesso',
    type: SuccessCreateResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de validação',
    type: ValidationErrorResponseDto,
  })
  async createStudent(@Body() createStudentDto: CreateStudentDto) {
    return await this.natsClient.send('createStudent', createStudentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obter todos os estudantes' })
  @ApiResponse({
    status: 200,
    description: 'Lista com todos os estudantes',
    type: [StudentResponseDto],
  })
  async listStudent() {
    return await this.natsClient.send('listStudent', {});
  }

  @Get(':studentId')
  @ApiOperation({ summary: 'Obter estudante por ID' })
  @ApiResponse({
    status: 200,
    description: 'Dados do estudante',
    type: StudentResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Estudante não encontrado',
    type: NotFoundErrorResponseDto,
  })
  async getStudent(@Param('studentId') studentId: string) {
    const response = await lastValueFrom(this.natsClient.send('getStudent', studentId));

    if (response?.statusCode && response?.statusCode !== HttpStatus.OK) {
      throw new HttpException(response.message, response.statusCode);
    }

    return response;
  }

  @Patch(':studentId')
  @ApiOperation({ summary: 'Atualizar um estudante' })
  @ApiResponse({
    status: 200,
    description: 'Estudante atualizado com sucesso',
    type: SuccessUpdateResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de validação',
    type: ValidationErrorResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Estudante não encontrado',
    type: NotFoundErrorResponseDto,
  })
  @Patch(':studentId')
  async updateStudent(@Param('studentId') studentId: string, @Body() updateStudentDto: CreateStudentDto) {
    const response = await lastValueFrom(
      this.natsClient.send('updateStudent', { data: updateStudentDto, studentId: studentId })
    );

    if (response?.statusCode && response?.statusCode !== HttpStatus.OK) {
      throw new HttpException(response.message, response.statusCode);
    }

    return response;
  }

  @Delete(':studentId')
  @ApiOperation({ summary: 'Excluir um estudante' })
  @ApiResponse({
    status: 200,
    description: 'Estudante excluído com sucesso',
    type: SuccessDisableResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Estudante não encontrado',
    type: NotFoundErrorResponseDto,
  })
  @Delete(':studentId')
  async disableStudent(@Param('studentId') studentId: string) {
    const response = await lastValueFrom(this.natsClient.send('disableStudent', studentId));

    if (response?.statusCode && response?.statusCode !== HttpStatus.OK) {
      throw new HttpException(response.message, response.statusCode);
    }

    return response;
  }
}
