import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { CreateSchoolDto } from './dtos/CreateSchool.dto';

@Controller('schools')
export class SchoolsController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}
  @Post()
  async createSchool(@Body() createSchoolDto: CreateSchoolDto) {
    const user = await firstValueFrom(
      this.natsClient.send('registerUser', {
        name: createSchoolDto.directorName,
        email: createSchoolDto.directorEmail,
        password: createSchoolDto.directorPassword,
        role: 'DIRECTOR',
      }),
    );

    this.natsClient.emit('createSchool', {
      name: createSchoolDto.name,
      directorEmail: createSchoolDto.directorEmail,
      numberStudents: createSchoolDto.numberStudents,
      userId: user.id,
    });
  }

  @Get()
  async listSchools() {
    return await this.natsClient.send('listSchool', {});
  }

  @Get(':schoolId')
  async getSchool(@Param('schoolId') schoolId: string) {
    return await this.natsClient.send('getSchool', schoolId);
  }

  @Get(':schoolId/classes')
  async getSchoolClasses(@Param('schoolId') schoolId: string) {
    return await lastValueFrom(this.natsClient.send('getSchoolClasses', schoolId));
  }

  @Get(':schoolId/students')
  async getSchoolStudents(@Param('schoolId') schoolId: string) {
    return await lastValueFrom(this.natsClient.send('getSchoolStudents', schoolId));
  }

  @Get(':schoolId/teachers')
  async getSchoolTeachers(@Param('schoolId') schoolId: string) {
    return await lastValueFrom(this.natsClient.send('getSchoolTeachers', schoolId));
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
