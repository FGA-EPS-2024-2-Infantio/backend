import { Body, Controller, Get, Param, Inject, Post, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateAttendanceDto } from './dtos/CreateAttendance.dto';

@Controller('attendances')
export class AttendanceController {
  constructor(@Inject('NATS_SERVICE') private readonly natsClient: ClientProxy) {}
  @Post()
  async createAttendance(@Body() createAttendanceDto: CreateAttendanceDto[]) {
    try {
      const response = await lastValueFrom(this.natsClient.send('createAttendance', createAttendanceDto));
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
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  @Get('/class/:classId')
  async getAttendanceByClass(@Param('classId') classId: string) {
    try {
      const response = this.natsClient.send('listAttendanceByClassId', classId);
      return response;
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  @Get('/student/:studentId')
  async getAttendanceByStudent(@Param('studentId') studentId: string) {
    try {
      const response = this.natsClient.send('listAttendanceByStudentId', studentId);
      return response;
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  @Get('/date/:date/class/:classId')
  async getAttendanceByDate(@Param('date') date: string, @Param('classId') classId: string) {
    try {
      const response = this.natsClient.send('listAttendanceByDate', { date, classId });
      return response;
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  @Get(':attendanceId')
  async getAttendanceById(@Param('attendanceId') attendanceId: string) {
    try {
      const response = this.natsClient.send('getAttendanceById', attendanceId);
      return response;
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  @Patch(':attendanceId')
  async updateAttendance(
    @Param('attendanceId') attendanceId: string,
    @Body() updateAttendanceDto: CreateAttendanceDto,
  ) {
    try {
      const response = this.natsClient.emit('updateAttendance', {
        data: updateAttendanceDto,
        attendanceId: attendanceId,
      });
      return response;
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  @Patch('/attendanceList/List')
  async updateAttendanceList(@Body() updateAttendanceDto: CreateAttendanceDto[]) {
    try {
      const response = await this.natsClient.emit('updateList', { attendanceList: updateAttendanceDto });
      return response;
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }
}
