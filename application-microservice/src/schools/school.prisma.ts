import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateSchoolDto } from './dtos/CreateSchool.dto';
import { SchoolResponseDto } from './dtos/SchoolResponse.dto';

@Injectable()
export class SchoolsPrismaService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateSchoolDto) {
    return await this.prisma.school.create({ data });
  }

  async findAll(): Promise<SchoolResponseDto[]> {
    return await this.prisma.school.findMany({
      orderBy: [
        {
          disabledAt: 'desc',
        },
        {
          name: 'asc',
        },
      ],
    });
  }

  async get(schoolId: string): Promise<SchoolResponseDto> {
    return await this.prisma.school.findUnique({
      where: {
        id: schoolId,
      },
    });
  }

  async disable(schoolId: string): Promise<SchoolResponseDto> {
    return await this.prisma.school.update({
      where: {
        id: schoolId,
      },
      data: {
        disabled: true,
        disabledAt: new Date(),
      },
    });
  }

  async update(input: {
    data: CreateSchoolDto;
    schoolId: string;
  }): Promise<SchoolResponseDto> {
    return await this.prisma.school.update({
      where: {
        id: input.schoolId,
      },
      data: input.data,
    });
  }

  async findClassesBySchool(schoolId: string) {
    return await this.prisma.class.findMany({
      where: { schoolId },
    });
  }

  async findStudentsBySchool(schoolId: string) {
    return await this.prisma.student.findMany({
      where: { schoolId },
    });
  }

  async findTeachersBySchool(schoolId: string) {
    return await this.prisma.teacher.findMany({
      where: { schoolId },
    });
  }
}
