// src/modules/schools/prisma/schools.prisma.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ClassResponseDto } from './dtos/ClassResponse.dto';
import { CreateClassDto } from './dtos/CreateClass.dto';

@Injectable()
export class ClassesPrismaService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateClassDto): Promise<ClassResponseDto> {
    const { name, teacherId } = data;

    const newClass = await this.prisma.class.create({
      data: {
        name,
        teacherId,
        disabled: false,
      },
      include: {
        teacher: true,
        students: true,
      },
    });

    return {
      id: newClass.id,
      name: newClass.name,
      teacher: {
        id: newClass.teacher.id,
        name: newClass.teacher.name,
      },
      students: newClass.students.map((s) => ({
        id: s.id,
        name: s.name,
      })),
      disabled: newClass.disabled,
      disabledAt: newClass.disabledAt ?? undefined,
      createdAt: newClass.createdAt,
      updatedAt: newClass.updatedAt,
    };
  }

  async findAll(): Promise<ClassResponseDto[]> {
    const classes = await this.prisma.class.findMany({
      orderBy: [
        {
          disabledAt: 'desc',
        },
        {
          name: 'asc',
        },
      ],
      include: {
        teacher: true,
        students: true,
      },
    });

    return classes.map((classData) => ({
      id: classData.id,
      name: classData.name,
      teacher: {
        id: classData.teacher.id,
        name: classData.teacher.name,
      },
      students: classData.students.map((s) => ({
        id: s.id,
        name: s.name,
      })),
      disabled: classData.disabled,
      disabledAt: classData.disabledAt ?? undefined,
      createdAt: classData.createdAt,
      updatedAt: classData.updatedAt,
    }));
  }

  async get(classId: string): Promise<ClassResponseDto> {
    const classData = await this.prisma.class.findUnique({
      where: {
        id: classId,
      },
      include: {
        teacher: true,
        students: true,
      },
    });

    if (!classData) {
      throw new Error('Class not found');
    }

    return {
      id: classData.id,
      name: classData.name,
      teacher: {
        id: classData.teacher.id,
        name: classData.teacher.name,
      },
      students: classData.students.map((s) => ({
        id: s.id,
        name: s.name,
      })),
      disabled: classData.disabled,
      disabledAt: classData.disabledAt ?? undefined,
      createdAt: classData.createdAt,
      updatedAt: classData.updatedAt,
    };
  }

  async disable(classId: string): Promise<ClassResponseDto> {
    const classData = await this.prisma.class.update({
      where: {
        id: classId,
      },
      data: {
        disabled: true,
        disabledAt: new Date(),
      },
      include: {
        teacher: true,
        students: true,
      },
    });

    if (!classData) {
      throw new Error('Class not found');
    }

    return {
      id: classData.id,
      name: classData.name,
      teacher: {
        id: classData.teacher.id,
        name: classData.teacher.name,
      },
      students: classData.students.map((s) => ({
        id: s.id,
        name: s.name,
      })),
      disabled: classData.disabled,
      disabledAt: classData.disabledAt ?? undefined,
      createdAt: classData.createdAt,
      updatedAt: classData.updatedAt,
    };
  }

  async update(input: {
    data: CreateClassDto;
    classId: string;
  }): Promise<ClassResponseDto> {
    const { data, classId } = input;

    const updatedClass = await this.prisma.class.update({
      where: {
        id: classId,
      },
      data: {
        name: data.name,
        teacherId: data.teacherId,
        disabled: data.disabled ?? undefined,
      },
      include: {
        teacher: true,
        students: true,
      },
    });

    return {
      id: updatedClass.id,
      name: updatedClass.name,
      teacher: {
        id: updatedClass.teacher.id,
        name: updatedClass.teacher.name,
      },
      students: updatedClass.students.map((s) => ({
        id: s.id,
        name: s.name,
      })),
      disabled: updatedClass.disabled,
      disabledAt: updatedClass.disabledAt ?? undefined,
      createdAt: updatedClass.createdAt,
      updatedAt: updatedClass.updatedAt,
    };
  }

  async updateStudents(
    classId: string,
    studentIds: string[],
  ): Promise<ClassResponseDto> {
    const updatedClass = await this.prisma.class.update({
      where: {
        id: classId,
      },
      data: {
        students: {
          set: studentIds.map((studentId) => ({ id: studentId })),
        },
      },
      include: {
        teacher: true,
        students: true,
      },
    });

    return {
      id: updatedClass.id,
      name: updatedClass.name,
      teacher: {
        id: updatedClass.teacher.id,
        name: updatedClass.teacher.name,
      },
      students: updatedClass.students.map((s) => ({
        id: s.id,
        name: s.name,
      })),
      disabled: updatedClass.disabled,
      disabledAt: updatedClass.disabledAt ?? undefined,
      createdAt: updatedClass.createdAt,
      updatedAt: updatedClass.updatedAt,
    };
  }
}
