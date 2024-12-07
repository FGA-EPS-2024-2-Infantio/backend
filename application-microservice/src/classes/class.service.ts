// src/modules/schools/services/schools.service.ts
import { Injectable } from '@nestjs/common';
import { ClassesPrismaService } from './class.prisma';
import { ClassResponseDto } from './dtos/ClassResponse.dto';
import { CreateClassDto } from './dtos/CreateClass.dto';

@Injectable()
export class ClassesService {
  constructor(private readonly classesPrismaService: ClassesPrismaService) {}

  async create(data: CreateClassDto): Promise<ClassResponseDto> {
    return await this.classesPrismaService.create(data);
  }

  async findAll(): Promise<ClassResponseDto[]> {
    return await this.classesPrismaService.findAll();
  }

  async get(classId: string): Promise<ClassResponseDto> {
    return await this.classesPrismaService.get(classId);
  }

  async disable(classId: string): Promise<ClassResponseDto> {
    return await this.classesPrismaService.disable(classId);
  }

  async update(input: {
    data: CreateClassDto;
    classId: string;
  }): Promise<ClassResponseDto> {
    return await this.classesPrismaService.update(input);
  }

  async updateStudents(
    classId: string,
    studentIds: string[],
  ): Promise<ClassResponseDto> {
    return await this.classesPrismaService.updateStudents(classId, studentIds);
  }
}
