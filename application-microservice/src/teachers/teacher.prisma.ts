// src/modules/schools/prisma/schools.prisma.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateTeacherDto } from './dtos/CreateTeacher.dto';
import { TeacherResponseDto } from './dtos/TeacherResponse.dto';

@Injectable()
export class TeachersPrismaService {
  constructor(private readonly prisma: PrismaService) {}

  async createTeacher(data: CreateTeacherDto) {
    return await this.prisma.teacher.create({
      data: {
        name: data.name,
        userId: data.userId,
        numberOfClasses: data.numberOfClasses,
        cpf: data.cpf,
        startDate: data.startDate,
        school: {
          connect: { id: data.schoolId },
        },
      },
    });
  }

  async findAllTeachers(input: {
    userId: string;
  }): Promise<TeacherResponseDto[]> {
    return await this.prisma.teacher.findMany({
      where: {
        school: {
          userId: input.userId,
        },
      },
    });
  }

  async get(teacherId: string): Promise<TeacherResponseDto> {
    return await this.prisma.teacher.findUnique({
      where: {
        id: teacherId,
      },
    });
  }

  async disable(input: { teacherId: string }): Promise<void> {
    await this.prisma.teacher.update({
      where: { id: input.teacherId },
      data: {
        disabledAt: new Date(),
        disabled: true,
      },
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

  async findClassesByTeacher(teacherId: string) {
    return await this.prisma.class.findMany({
      where: {
        teacher: {
          userId: teacherId,
        },
      },
      include: {
        students: true,
      },
    });
  }
}
