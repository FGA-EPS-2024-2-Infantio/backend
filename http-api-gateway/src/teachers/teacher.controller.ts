import { BadRequestException, Body, Controller, Get, Param, Inject, Post, Delete, Patch, HttpCode } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateTeacherDto } from './dtos/CreateTeacher.dto';
import { lastValueFrom } from 'rxjs';
import { ConflictException } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Controller('teachers')
export class TeacherController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) { }
  @Post()
  async createTeacher(@Body() createTeacherDto: CreateTeacherDto) {
    try {
      const response = await lastValueFrom(
        this.natsClient.send('createTeacher', createTeacherDto),
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

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
  async disableTeacher(@Param('teacherId') teacherId: string) {
    try {
      const response = this.natsClient.emit('disableTeacher', { teacherId: teacherId });
      return response
    } catch (error) {
      throw error
    }
  }

  @Patch(':teacherId')
  async updateTeacher(@Param('teacherId') teacherId: string, @Body() updateTeacherDto: CreateTeacherDto) {
    try {
      const response = this.natsClient.emit('updateTeacher', { data: updateTeacherDto, teacherId: teacherId });
      return response;
    } catch (error) {
      throw error;
    }
  }
}
