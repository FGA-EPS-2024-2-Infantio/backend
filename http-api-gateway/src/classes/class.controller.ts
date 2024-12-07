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

@Controller('classes')
export class ClassController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Post()
  async createClass(@Body() createClassDto: CreateClassDto) {
    try {
      const response = await lastValueFrom(this.natsClient.send('createClass', createClassDto));
      return response;
    } catch (error) {
      throw new BadRequestException('Failed to create class', error);
    }
  }

  @Get()
  async listClasses() {
    try {
      const response = await this.natsClient.send('listClasses', {});
      return response;
    } catch (error) {
      throw new BadRequestException('Failed to fetch classes', error);
    }
  }

  @Get(':classId')
  async getClass(@Param('classId') classId: string) {
    try {
      const response = await this.natsClient.send('getClass', classId);
      return response;
    } catch (error) {
      throw new BadRequestException(`Failed to fetch class with id ${classId}`, error);
    }
  }

  @Delete(':classId')
  @HttpCode(200)
  async deleteClass(@Param('classId') classId: string) {
    try {
      const response = await this.natsClient.send('disableClass', classId);
      return response;
    } catch (error) {
      throw new BadRequestException(`Failed to delete class with id ${classId}`, error);
    }
  }

  @Patch(':classId')
  async updateClass(@Param('classId') classId: string, @Body() updateClassDto: CreateClassDto) {
    try {
      const response = await this.natsClient.send('updateClass', { data: updateClassDto, classId: classId });
      return response;
    } catch (error) {
      throw new BadRequestException(`Failed to update class with id ${classId}`, error);
    }
  }

  @Post(':classId/students')
  async updateStudents(@Param('classId') classId: string, @Body() { studentIds }: { studentIds: string[] }) {
    try {
      const response = await this.natsClient.send('updateClassStudents', { classId, studentIds });
      return response;
    } catch (error) {
      throw new BadRequestException(`Failed to update students to class with id ${classId}`, error);
    }
  }
}
