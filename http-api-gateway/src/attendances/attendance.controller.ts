import { Body, Controller, Get, Param, Inject, Post, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateAttendanceDto } from './dtos/CreateAttendance.dto';

@ApiTags('Attendances')
@Controller('attendances')
export class AttendanceController {
  constructor(@Inject('NATS_SERVICE') private readonly natsClient: ClientProxy) {}

  @Post()
  @ApiOperation({ summary: 'Criar presenças' })
  @ApiBody({ type: [CreateAttendanceDto] })
  @ApiResponse({ status: 201, description: 'Presenças criadas com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  async createAttendance(@Body() createAttendanceDto: CreateAttendanceDto[]) {
    try {
      const response = await lastValueFrom(this.natsClient.send('createAttendance', createAttendanceDto));
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as presenças' })
  @ApiResponse({ status: 200, description: 'Lista de presenças retornada com sucesso.' })
  async listAttendance() {
    try {
      const response = await lastValueFrom(this.natsClient.send('listAttendance', {}));
      return response;
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  @Get('/class/:classId')
  @ApiOperation({ summary: 'Obter presenças por turma' })
  @ApiParam({ name: 'classId', description: 'ID da turma', example: '67890' })
  @ApiResponse({ status: 200, description: 'Lista de presenças da turma.' })
  async getAttendanceByClass(@Param('classId') classId: string) {
    try {
      const response = await lastValueFrom(this.natsClient.send('listAttendanceByClassId', classId));
      return response;
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  @Get('/student/:studentId')
  @ApiOperation({ summary: 'Obter presenças por aluno' })
  @ApiParam({ name: 'studentId', description: 'ID do aluno', example: '12345' })
  @ApiResponse({ status: 200, description: 'Lista de presenças do aluno.' })
  async getAttendanceByStudent(@Param('studentId') studentId: string) {
    try {
      const response = await lastValueFrom(this.natsClient.send('listAttendanceByStudentId', studentId));
      return response;
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  @Get('/date/:date/class/:classId')
  @ApiOperation({ summary: 'Obter presenças por data e turma' })
  @ApiParam({ name: 'date', description: 'Data da presença', example: '2024-12-01' })
  @ApiParam({ name: 'classId', description: 'ID da turma', example: '67890' })
  @ApiResponse({ status: 200, description: 'Lista de presenças para a data e turma especificadas.' })
  async getAttendanceByDate(@Param('date') date: string, @Param('classId') classId: string) {
    try {
      const response = await lastValueFrom(this.natsClient.send('listAttendanceByDate', { date, classId }));
      return response;
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  @Get(':attendanceId')
  @ApiOperation({ summary: 'Obter presença por ID' })
  @ApiParam({ name: 'attendanceId', description: 'ID da presença', example: 'abc123' })
  @ApiResponse({ status: 200, description: 'Presença retornada com sucesso.' })
  async getAttendanceById(@Param('attendanceId') attendanceId: string) {
    try {
      const response = await lastValueFrom(this.natsClient.send('getAttendanceById', attendanceId));
      return response;
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  @Patch(':attendanceId')
  @ApiOperation({ summary: 'Atualizar presença por ID' })
  @ApiParam({ name: 'attendanceId', description: 'ID da presença', example: 'abc123' })
  @ApiBody({ type: CreateAttendanceDto })
  @ApiResponse({ status: 200, description: 'Presença atualizada com sucesso.' })
  async updateAttendance(
    @Param('attendanceId') attendanceId: string,
    @Body() updateAttendanceDto: CreateAttendanceDto,
  ) {
    try {
      const response = await lastValueFrom(
        this.natsClient.send('updateAttendance', {
          data: updateAttendanceDto,
          attendanceId: attendanceId,
        }),
      );
      return response;
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  @Patch('/attendanceList/List')
  @ApiOperation({ summary: 'Atualizar lista de presenças' })
  @ApiBody({ type: [CreateAttendanceDto] })
  @ApiResponse({ status: 200, description: 'Lista de presenças atualizada com sucesso.' })
  async updateAttendanceList(@Body() updateAttendanceDto: CreateAttendanceDto[]) {
    try {
      const response = await lastValueFrom(this.natsClient.send('updateList', { attendanceList: updateAttendanceDto }));
      return response;
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }
}
