// src/modules/schools/services/schools.service.ts
import { Injectable } from '@nestjs/common';
import { CreateSchoolDto } from './dtos/CreateStudent.dto';
import { SchoolsPrismaService } from './school.prisma';
import { SchoolResponseDto } from './dtos/SchoolResponse.dto';

@Injectable()
export class SchoolsService {
  constructor(private readonly schoolsPrismaService: SchoolsPrismaService) {}

  async create(data: CreateSchoolDto) {
    return await this.schoolsPrismaService.create(data);
  }

  async findAll(): Promise<SchoolResponseDto[]> {
    return await this.schoolsPrismaService.findAll();
  }

  async get(schoolId: string): Promise<SchoolResponseDto> {
    return await this.schoolsPrismaService.get(schoolId);
  }

  async disable(schoolId: string): Promise<SchoolResponseDto> {
    return await this.schoolsPrismaService.disable(schoolId);
  }

  async update(input: { data: CreateSchoolDto; schoolId: string }) {
    return await this.schoolsPrismaService.update(input);
  }
}
