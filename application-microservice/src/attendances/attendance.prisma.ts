// src/modules/schools/prisma/schools.prisma.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateAttendanceDto } from './dtos/CreateAttendance.dto';
import { AttendanceResponseDto } from './dtos/AttendanceResponse.dto';

@Injectable()
export class AttendancePrismaService {
  constructor(private prisma: PrismaService) {}

  async createAttendance(data: CreateAttendanceDto) {
    return await this.prisma.attendance.create({ data });
  }

  async findAttendanceByClass(classId: string): Promise<AttendanceResponseDto[]> {
    return await this.prisma.attendance.findMany({
        where: {
            classId: classId
        }, 
        select: {
            studentId: true, 
            student: true,
            date: true,
            classId: true,
            hasAttended: true,
        }
    });
  }

  async findAttendanceByStudent(studentId: string): Promise<AttendanceResponseDto[]> {
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
        }
    });
  }

  async findAttendanceByDate(date: Date): Promise<AttendanceResponseDto[]> {
    return await this.prisma.attendance.findMany({
        where: {
            date: date,
        }, 
        select: {
            studentId: true, 
            student: true,
            date: true,
            classId: true,
            hasAttended: true,
        }
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
    }
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
}
