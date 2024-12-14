import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dtos/CreateStudent.dto';
import { StudentResponseDto } from './dtos/StudentResponse.dto';
import { StudentsPrismaService } from './student.prisma';

@Injectable()
export class StudentsService {
  constructor(private readonly studentsPrismaService: StudentsPrismaService) {}

  async create(data: CreateStudentDto) {
    try {
      const student = await this.studentsPrismaService.create(data);
      return {
        message: 'Student created successfully',
        data: student,
      };
    } catch (error) {
      throw new Error('Failed to create student: ' + error.message);
    }
  }

  async findAll(input: { userId: string }): Promise<StudentResponseDto[]> {
    return await this.studentsPrismaService.findAll(input);
  }

  async get(studentId: string): Promise<StudentResponseDto> {
    const student = await this.studentsPrismaService.get(studentId);

    if (student === null) {
      throw new Error('Student not found');
    }

    return student;
  }

  async update(input: { data: CreateStudentDto; studentId: string }) {
    try {
      const student = await this.studentsPrismaService.update(input);

      return {
        message: 'Student updated successfully',
        data: student,
      };
    } catch (error) {
      throw new Error('Failed to update student: ' + error.message);
    }
  }

  async disable(studentId: string) {
    const student = await this.studentsPrismaService.disable(studentId);

    return {
      message: 'Student deleted successfully',
      data: student,
    };
  }
}
