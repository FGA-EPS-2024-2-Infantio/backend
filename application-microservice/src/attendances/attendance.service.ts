import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dtos/CreateAttendance.dto';
import { AttendanceResponseDto } from './dtos/AttendanceResponse.dto';
import { AttendancePrismaService } from './attendance.prisma';

@Injectable()
export class AttendanceService {
  constructor(
    private readonly attendancePrismaService: AttendancePrismaService,
  ) {}

  async create(data: CreateAttendanceDto) {
    return await this.attendancePrismaService.createAttendance(data);
  }

  async findAllByClass(classId: string): Promise<AttendanceResponseDto[]> {
    return await this.attendancePrismaService.findAttendanceByClass(classId);
  }

  async findAllByStudent(studentId: string): Promise<AttendanceResponseDto[]> {
    return await this.attendancePrismaService.findAttendanceByStudent(
      studentId,
    );
  }

  async findAllByDateAndClass(
    date: Date,
    classId: string,
  ): Promise<AttendanceResponseDto[]> {
    return await this.attendancePrismaService.findAttendanceByDateAndClass(
      date,
      classId,
    );
  }

  async getById(attendanceId: string): Promise<AttendanceResponseDto> {
    return await this.attendancePrismaService.getById(attendanceId);
  }

  async get(): Promise<AttendanceResponseDto[]> {
    return await this.attendancePrismaService.get();
  }

  async updateAttendanceList(input: {
    attendanceList: CreateAttendanceDto[];
  }): Promise<number> {
    return await this.attendancePrismaService.updateAttendanceList(input);
  }

  async update(input: { data: CreateAttendanceDto; attendanceId: string }) {
    return await this.attendancePrismaService.update(input);
  }
}
