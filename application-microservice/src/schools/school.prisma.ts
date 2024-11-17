// src/modules/schools/prisma/schools.prisma.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateSchoolDto } from './dtos/CreateStudent.dto';
import { SchoolResponseDto } from './dtos/SchoolResponse.dto';

@Injectable()
export class SchoolsPrismaService {
  constructor(private prisma: PrismaService) {}

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

  async disable(schoolId: string): Promise<void> {
    await this.prisma.school.update({
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
}
