import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateStudentDto } from './dtos/CreateStudent.dto';
import { StudentResponseDto } from './dtos/StudentResponse.dto';

@Injectable()
export class StudentsPrismaService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateStudentDto) {
    return await this.prisma.student.create({ data });
  }

  async findAll(): Promise<StudentResponseDto[]> {
    return await this.prisma.student.findMany({
      orderBy: [
        {
          name: 'asc',
        },
      ],
    });
  }

  async get(studentId: string): Promise<StudentResponseDto> {
    return await this.prisma.student.findUnique({
      where: {
        id: studentId,
      },
    });
  }

  async update(input: {
    data: CreateStudentDto;
    studentId: string;
  }): Promise<StudentResponseDto> {
    return await this.prisma.student.update({
      where: {
        id: input.studentId,
      },
      data: input.data,
    });
  }

  async disable(studentId: string): Promise<StudentResponseDto> {
    return await this.prisma.student.update({
      where: {
        id: studentId,
      },
      data: {
        disabled: true,
        disabledAt: new Date(),
      },
    });
  }
}
