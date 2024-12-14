import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateStudentDto } from './dtos/CreateStudent.dto';

@Controller('students')
export class StudentsController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Post()
  async createStudent(@Body() createStudentDto: CreateStudentDto) {
    return await this.natsClient.send('createStudent', createStudentDto);
  }

  @Get(':userId/list')
  async listStudent(@Param('userId') userId: string) {
    return await this.natsClient.send('listStudent', { userId: userId });
  }

  @Get(':studentId')
  async getStudent(@Param('studentId') studentId: string) {
    return await this.natsClient.send('getStudent', studentId);
  }

  @Patch(':studentId')
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
  async disableStudent(@Param('studentId') studentId: string) {
    return await this.natsClient.send('disableStudent', studentId);
  }
}
