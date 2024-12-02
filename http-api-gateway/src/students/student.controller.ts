import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateStudentDto } from './dtos/CreateStudent.dto';
import { lastValueFrom } from 'rxjs';

@Controller('students')
export class StudentsController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Post()
  async createStudent(@Body() createStudentDto: CreateStudentDto) {
    return await this.natsClient.send('createStudent', createStudentDto);
  }

  @Get()
  async listStudent() {
    return await this.natsClient.send('listStudent', {});
  }

  @Get(':studentId')
  async getStudent(@Param('studentId') studentId: string) {
    return await this.natsClient.send('getStudent', studentId);
  }

  @Patch(':studentId')
  async updateStudent(@Param('studentId') studentId: string, @Body() updateStudentDto: CreateStudentDto) {
    return await this.natsClient.send('updateStudent', { data: updateStudentDto, studentId: studentId });
  }

  @Delete(':studentId')
  async disableStudent(@Param('studentId') studentId: string) {
    return await this.natsClient.send('disableStudent', studentId);
  }
}
