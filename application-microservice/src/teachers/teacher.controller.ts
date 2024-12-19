import { Controller, Inject } from '@nestjs/common';
import {
  ClientProxy,
  EventPattern,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTeacherDto } from './dtos/CreateTeacher.dto';
import { TeacherResponseDto } from './dtos/TeacherResponse.dto';
import { TeachersService } from './teacher.service';

@Controller()
export class TeacherMicroserviceController {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClients: ClientProxy,
    private readonly prisma: PrismaService,
    private readonly teachersService: TeachersService,
  ) {}
  @MessagePattern('createTeacher')
  async createTeacher(@Payload() createTeacherDto: CreateTeacherDto) {
    try {
      const teacher = await this.prisma.teacher.create({
        data: {
          name: createTeacherDto.name,
          numberOfClasses: createTeacherDto.numberOfClasses,
          userId: createTeacherDto.userId,
          cpf: createTeacherDto.cpf,
          startDate: new Date(createTeacherDto.startDate),
          school: {
            connect: { userId: createTeacherDto.directorId },
          },
        },
      });

      return {
        success: true,
        data: teacher,
        message: 'Teacher created successfully',
      };
    } catch (error) {
      if (error.code === 'P2002') {
        return {
          success: false,
          error: 'CPF already exists',
          code: 'UNIQUE_CONSTRAINT',
        };
      }
      if (error.code === 'P2000') {
        return {
          success: false,
          error: 'Value too long for the column',
          code: 'META_TARGET',
        };
      }
      throw error;
    }
  }

  @MessagePattern('listTeacher')
  async getAllTeachers(input: {
    userId: string;
  }): Promise<TeacherResponseDto[]> {
    try {
      const response = await this.teachersService.findAll(input);
      return response;
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  @MessagePattern('getTeacher')
  async get(@Payload() teacherId: string): Promise<TeacherResponseDto> {
    try {
      const response = await this.teachersService.get(teacherId);
      return response;
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  @EventPattern('disableTeacher')
  async disable(@Payload() input: { teacherId: string }) {
    try {
      await this.teachersService.disable(input);

      return {
        success: true,
        message: `Teacher:${input.teacherId} successfully disabled`,
      };
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  @MessagePattern('updateTeacher')
  async update(
    @Payload() input: { data: CreateTeacherDto; teacherId: string },
  ): Promise<TeacherResponseDto> {
    try {
      const response = await this.teachersService.update(input);
      return response;
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  @MessagePattern('getTeacherClasses')
  async getTeacherClasses(@Payload() teacherId: string) {
    try {
      const classes =
        await this.teachersService.findClassesByTeacher(teacherId);
      return classes;
    } catch (error) {
      throw new Error(
        `Failed to fetch classes for teacher ${teacherId}: ${error.message}`,
      );
    }
  }
}
