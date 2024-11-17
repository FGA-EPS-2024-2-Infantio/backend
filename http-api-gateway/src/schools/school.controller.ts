import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateSchoolDto } from './dtos/CreateSchool.dto';

@Controller('schools')
export class SchoolsController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}
  @Post()
  createSchool(@Body() createSchoolDto: CreateSchoolDto) {
    this.natsClient.emit('createSchool', createSchoolDto);
  }

  @Get()
  async listSchools() {
    return await this.natsClient.send('listSchool', {});
  }

  @Get(':schoolId')
  async getSchool(@Param('schoolId') schoolId: string) {
    return await this.natsClient.send('getSchool', schoolId);
  }

  @Delete(':schoolId')
  async disableSchool(@Param('schoolId') schoolId: string) {
    this.natsClient.emit('disableSchool', schoolId);
  }

  @Patch(':schoolId')
  updateSchool(@Param('schoolId') schoolId: string, @Body() updateSchoolDto: CreateSchoolDto) {
    this.natsClient.emit('updateSchool', { data: updateSchoolDto, schoolId: schoolId });
  }
}
