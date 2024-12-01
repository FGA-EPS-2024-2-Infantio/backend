// src/modules/schools/prisma/schools.prisma.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTeacherDto } from './dtos/CreateTeacher.dto';
import { TeacherResponseDto } from './dtos/TeacherResponse.dto';

@Injectable()
export class TeachersPrismaService {
  constructor(private prisma: PrismaService) {}

  async createTeacher(data: CreateTeacherDto) {
    return await this.prisma.teacher.create({ data });
  }

  async findAllTeachers(): Promise<TeacherResponseDto[]> {
    return await this.prisma.teacher.findMany();
  }

  async get(teacherId: string): Promise<TeacherResponseDto> {
    return await this.prisma.teacher.findUnique({
      where: {
        id: teacherId,
      },
    });
  }

  async disable(input: {teacherId: string}): Promise<void> {
    await this.prisma.teacher.update({
      where: {id: input.teacherId},
      data: {
        disabledAt: new Date(),
        disabled: true,
      }
    });
  }

  async update(input: {
    data: CreateTeacherDto;
    teacherId: string;
  }): Promise<TeacherResponseDto> {
    return await this.prisma.teacher.update({
      where: {
        id: input.teacherId,
      },
      data: input.data,
    });
  }
}
