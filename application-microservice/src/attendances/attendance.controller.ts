import { Controller, Inject } from '@nestjs/common';
import {
  ClientProxy,
  EventPattern,
  Payload,
  MessagePattern,
} from '@nestjs/microservices';
import { PrismaService } from 'src/database/prisma.service';
import { CreateAttendanceDto } from './dtos/CreateAttendance.dto';
import { AttendanceResponseDto } from './dtos/AttendanceResponse.dto';
import { AttendanceService } from './attendance.service';

@Controller()
export class AttendanceMicroserviceController {
  constructor(
    @Inject('NATS_SERVICE') private natsClients: ClientProxy,
    private prisma: PrismaService,
    private readonly attendanceService: AttendanceService,
  ) {}
  @MessagePattern('createAttendance')
  async createAttendance(@Payload() createAttendanceDto: CreateAttendanceDto[]) {
    try {
      const attendance = await this.prisma.attendance.createMany({
        data: createAttendanceDto
      });

      return {
        success: true,
        data: attendance,
        message: 'Attendance created successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern('listAttendanceByClassId')
  async getAllAttendanceByClass(@Payload() classId: string): Promise<AttendanceResponseDto[]> {
    try {
      const response = await this.attendanceService.findAllByClass(classId);
      return response;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern('listAttendanceByStudentId')
  async getAllAttendenceByStudent (@Payload() studentId: string): Promise<AttendanceResponseDto[]> {
    try {
      const response = await this.attendanceService.findAllByStudent(studentId);
      return response;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern('listAttendanceByDate')
  async getAllAttendenceByDate(
    @Payload() payload: { date: Date; classId: string }
  ): Promise<AttendanceResponseDto[]> {
    try {
      const { date, classId } = payload;
      const response = await this.attendanceService.findAllByDateAndClass(date, classId);
      return response;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern('getAttendanceById')
  async getAttendenceById (@Payload() attendanceId: string): Promise<AttendanceResponseDto> {
    try {
        const response = await this.attendanceService.getById(attendanceId);
        return response;
    } catch (error) {
        throw error;
    }
  }

  @MessagePattern('listAttendance')
  async getAttendence (): Promise<AttendanceResponseDto[]> {
    try {
        const response = await this.attendanceService.get();
        return response;
    } catch (error) {
        throw error;
    }
  }

  @MessagePattern('updateAttendance')
  async update(
    @Payload() input: { data: CreateAttendanceDto; attendanceId: string },
  ): Promise<AttendanceResponseDto> {
    try {
      const response = await this.attendanceService.update(input);
      return response;
    } catch (error) {
      throw error;
    }
  }


  @MessagePattern('updateList')
  async updateAttendanceList(
    @Payload() input: {attendanceList: CreateAttendanceDto[]},
  ): Promise<number> {
    try {
      const response = await this.attendanceService.updateAttendanceList(input);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
