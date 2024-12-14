// src/modules/teachers/services/teachers.service.ts
import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dtos/CreateTeacher.dto';
import { TeacherResponseDto } from './dtos/TeacherResponse.dto';
import { TeachersPrismaService } from './teacher.prisma';

@Injectable()
export class TeachersService {
  constructor(private readonly teachersPrismaService: TeachersPrismaService) {}

  async create(data: CreateTeacherDto) {
    return await this.teachersPrismaService.createTeacher(data);
  }

  async findAll(input: { userId: string }): Promise<TeacherResponseDto[]> {
    return await this.teachersPrismaService.findAllTeachers(input);
  }

  async get(teacherId: string): Promise<TeacherResponseDto> {
    return await this.teachersPrismaService.get(teacherId);
  }

  async disable(input: { teacherId: string }): Promise<void> {
    await this.teachersPrismaService.disable(input);
  }

  async update(input: { data: CreateTeacherDto; teacherId: string }) {
    return await this.teachersPrismaService.update(input);
  }

  async findClassesByTeacher(teacherId: string) {
    return await this.teachersPrismaService.findClassesByTeacher(teacherId);
  }
}
