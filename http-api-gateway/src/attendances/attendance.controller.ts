import { BadRequestException, Body, Controller, Get, Param, Inject, Post, Delete, Patch, HttpCode, ValidationPipe, UsePipes, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateAttendanceDto } from './dtos/CreateAttendance.dto';

@Controller('attendances')
export class AttendanceController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) { }
  @Post()
  async createAttendance(@Body() createAttendanceDto: CreateAttendanceDto[]) {
    try {
      const response = await lastValueFrom(
        this.natsClient.send('createAttendance', createAttendanceDto)
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async listAttendance() {
    try {
      const response = this.natsClient.send('listAttendance', {});
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Get('/class/:classId')
  async getAttendanceByClass(@Param('classId') classId: string) {
    try {
      const response = this.natsClient.send('listAttendanceByClassId', classId);
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Get('/student/:studentId')
  async getAttendanceByStudent(@Param('studentId') studentId: string) {
    try {
      const response = this.natsClient.send('listAttendanceByStudentId', studentId);
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Get('/date/:date')
  async getAttendanceByDate(@Param('date') studentId: string) {
    try {
      const response = this.natsClient.send('listAttendanceByDate', studentId);
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Get(':attendanceId')
  async getAttendanceById(@Param('attendanceId') attendanceId: string) {
    try {
      const response = this.natsClient.send('getAttendanceById', attendanceId);
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Patch(':attendanceId')
  async updateAttendance(@Param('attendanceId') attendanceId: string, @Body() updateAttendanceDto: CreateAttendanceDto) {
    try {
      const response = this.natsClient.emit('updateAttendance', { data: updateAttendanceDto, attendanceId: attendanceId });
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Patch('/attendanceList/List')
  async updateAttendanceList(@Body() updateAttendanceDto: CreateAttendanceDto[]) {
    try {
      const response = await this.natsClient.emit('updateList', { attendanceList: updateAttendanceDto });
      return response;
    } catch (error) {
      throw error;
    }
  }
}
