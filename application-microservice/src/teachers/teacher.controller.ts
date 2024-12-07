import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload, MessagePattern, } from '@nestjs/microservices';
import { CreateTeacherDto } from './dtos/CreateTeacher.dto';
import { TeacherResponseDto } from './dtos/TeacherResponse.dto';
import { TeachersService } from './teacher.service';
import { PrismaService } from '../database/prisma.service';

@Controller()
export class TeacherMicroserviceController {
  constructor(
    @Inject('NATS_SERVICE') private natsClients: ClientProxy,
    private prisma: PrismaService,
    private readonly teachersService: TeachersService,
  ) { }
  @MessagePattern('createTeacher')
  async createTeacher(@Payload() createTeacherDto: CreateTeacherDto) {
    try {
      const teacher = await this.prisma.teacher.create({
        data: {
          name: createTeacherDto.name,
          numberOfClasses: createTeacherDto.numberOfClasses,
          cpf: createTeacherDto.cpf,
          startDate: new Date(createTeacherDto.startDate),
        },
      });

      return {
        success: true,
        data: teacher,
        message: 'Teacher created successfully'
      };
    } catch (error) {
      if (error.code === 'P2002') {
        return {
          success: false,
          error: 'CPF already exists',
          code: 'UNIQUE_CONSTRAINT'
        };
      }
      if (error.code === 'P2000'){
        return {
          success: false,
          error: 'Value too long for the column',
          code: 'META_TARGET'
        };
      }
      throw error;
    }
  }

  @MessagePattern('listTeacher')
  async getAllTeachers(): Promise<TeacherResponseDto[]> {
    try {
      const response = await this.teachersService.findAll();
      return response;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern('getTeacher')
  async get(@Payload() teacherId: string): Promise<TeacherResponseDto> {
    try {
      const response = await this.teachersService.get(teacherId);
      return response;
    } catch (error) {
      throw error;
    }
  }

  @EventPattern('deleteTeacher')
  async disable(@Payload() teacherId: string) {
    try {
      await this.teachersService.delete(teacherId);

      return {
        success: true,
        message: `Successfully Teacher:${teacherId} deleted`
      };
    } catch (error) {
      throw error;
    }
 
  }

  @MessagePattern('updateTeacher')
  async update(
    @Payload() input: { data: CreateTeacherDto; teacherId: string },
  ): Promise<TeacherResponseDto> {
    try {
      const response = await this.teachersService.update(input);
      return response
    } catch (error) {
      throw error
    }
  }
}
