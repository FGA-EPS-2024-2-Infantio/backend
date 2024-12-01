import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dtos/CreateStudent.dto';
import { StudentResponseDto } from './dtos/StudentResponse.dto';
import { StudentsPrismaService } from './student.prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Prisma } from '@prisma/client';

@Injectable()
export class StudentsService {
  constructor(private readonly studentsPrismaService: StudentsPrismaService) {}

  async create(data: CreateStudentDto) {
    const student = await this.studentsPrismaService.create(data);

    return {
      message: 'Student created successfully',
      data: student,
    };
  }

  async findAll(): Promise<StudentResponseDto[]> {
    return await this.studentsPrismaService.findAll();
  }

  async get(studentId: string): Promise<StudentResponseDto> {
    const student = await this.studentsPrismaService.get(studentId);

    if (student === null)
      throw new PrismaClientKnownRequestError('Student not found', {
        code: 'P2025',
        clientVersion: Prisma.prismaVersion.client,
      });

    return student;
  }

  async update(input: {
    data: CreateStudentDto;
    studentId: string;
  }) {
    const student = await this.studentsPrismaService.update(input);

    return {
      message: 'Student updated successfully',
      data: student,
    };
  }

  async disable(studentId: string) {
    const student = await this.studentsPrismaService.disable(studentId);

    return {
      message: 'Student deleted successfully',
      data: student,
    };
  }
}
