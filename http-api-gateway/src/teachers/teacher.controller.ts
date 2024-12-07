import { BadRequestException, Body, Controller, Get, Param, Inject, Post, Delete, Patch, HttpCode } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateTeacherDto } from './dtos/CreateTeacher.dto';
import { lastValueFrom } from 'rxjs';

@Controller('teachers')
export class TeacherController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) { }
  @Post()
  async createTeacher(@Body() createteacherDto: CreateTeacherDto) {
    try {
      const response = await lastValueFrom(
        this.natsClient.send('createTeacher', createteacherDto)
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async listTeacher() {
    try {
      const response = this.natsClient.send('listTeacher', {});
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Get(':teacherId')
  async getTeacher(@Param('teacherId') teacherId: string) {
    try {
      const response = await this.natsClient.send('getTeacher', teacherId);
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':teacherId')
  @HttpCode(200)
  async deleteTeacher(@Param('teacherId') teacherId: string) {
      try {
        const response =  await lastValueFrom(this.natsClient.send('deleteTeacher', teacherId));
        return response
      } catch (error) {
        throw error
      }
  }

  @Patch(':teacherId')
  async updateTeacher(@Param('teacherId') teacherId: string, @Body() updateTeacherDto: CreateTeacherDto) {
    try {
      const response = await this.natsClient.emit('updateTeacher', { data: updateTeacherDto, teacherId: teacherId });
      return response;
    } catch (error) {
      throw error;
    }
  }
}
