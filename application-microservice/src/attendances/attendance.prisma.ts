// src/modules/schools/prisma/schools.prisma.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateAttendanceDto } from './dtos/CreateAttendance.dto';
import { AttendanceResponseDto } from './dtos/AttendanceResponse.dto';

@Injectable()
export class AttendancePrismaService {
  constructor(private readonly prisma: PrismaService) { }

  async createAttendance(data: CreateAttendanceDto) {
    return await this.prisma.attendance.create({ data });
  }

  async findAttendanceByClass(
    classId: string,
  ): Promise<AttendanceResponseDto[]> {
    return await this.prisma.attendance.findMany({
      where: {
        classId: classId,
      },
      select: {
        id: true,
        studentId: true,
        student: true,
        date: true,
        classId: true,
        hasAttended: true,
      },
    });
  }

  async findAttendanceByStudent(
    studentId: string,
  ): Promise<AttendanceResponseDto[]> {
    return await this.prisma.attendance.findMany({
      where: {
        studentId: studentId,
      },
      select: {
        studentId: true,
        student: true,
        date: true,
        classId: true,
        hasAttended: true,
      },
    });
  }

  async findAttendanceByDateAndClass(
    date: Date,
    classId: string,
  ): Promise<AttendanceResponseDto[]> {
    return await this.prisma.attendance.findMany({
      where: {
        date: new Date(date),
        classId: classId,
      },
      select: {
        studentId: true,
        student: true,
        date: true,
        classId: true,
        hasAttended: true,
      },
    });
  }

  async getById(attendanceId: string): Promise<AttendanceResponseDto> {
    return await this.prisma.attendance.findUnique({
      where: {
        id: attendanceId,
      },
      select: {
        studentId: true,
        student: true,
        date: true,
        classId: true,
        hasAttended: true,
      },
    });
  }

  async get(): Promise<AttendanceResponseDto[]> {
    return await this.prisma.attendance.findMany();
  }

  async update(input: {
    data: CreateAttendanceDto;
    attendanceId: string;
  }): Promise<AttendanceResponseDto> {
    return await this.prisma.attendance.update({
      where: {
        id: input.attendanceId,
      },
      data: input.data,
    });
  }

  async updateAttendanceList(input: {
    attendanceList: CreateAttendanceDto[];
  }): Promise<number> {
    const updates = input.attendanceList.map((attendance) =>
      this.prisma.attendance.updateMany({
        where: {
          studentId: attendance.studentId,
          classId: attendance.classId,
          date: attendance.date,
        },
        data: {
          hasAttended: attendance.hasAttended,
        },
      }),
    );

    const results = await this.prisma.$transaction(updates);

    const totalUpdated = results.reduce((sum, result) => sum + result.count, 0);

    return totalUpdated;
  }
}
