import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateStudentDto } from './dtos/CreateStudent.dto';
import { StudentResponseDto } from './dtos/StudentResponse.dto';
import { StudentsService } from './student.service';

@Controller()
export class StudentMicroserviceController {
  constructor(
    @Inject('NATS_SERVICE') private natsClients: ClientProxy,
    private readonly studentService: StudentsService,
  ) {}

  @MessagePattern('createStudent')
  async create(@Payload() createStudentDto: CreateStudentDto) {
    return await this.studentService.create(createStudentDto);
  }

  @MessagePattern('listStudent')
  async getAll(): Promise<StudentResponseDto[]> {
    return await this.studentService.findAll();
  }

  @MessagePattern('getStudent')
  async get(studentId: string) {
    try {
      return await this.studentService.get(studentId);
    } catch (error) {
      if (error.code === 'P2025') {
        return {
          statusCode: 404,
          message: 'Student not found',
        };
      }
      throw error;
    }
  }

  @MessagePattern('updateStudent')
  async update(@Payload() input: { data: CreateStudentDto; studentId: string }) {
    try {
      const response = await this.studentService.update(input);
      return {
        statusCode: 200,
        message: 'Student updated successfully',
        data: response,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        return {
          statusCode: 404,
          message: 'Student not found',
        };
      }
      throw error;
    }
  }

  @MessagePattern('disableStudent')
  async disable(@Payload() studentId: string) {
    try {
      const response = await this.studentService.disable(studentId);
      return {
        statusCode: 200,
        message: 'Student deleted successfully',
        data: response,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        return {
          statusCode: 404,
          message: 'Student not found',
        };
      }
      throw error;
    }
  }
}
