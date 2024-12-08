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
  async get(studentId: string): Promise<StudentResponseDto> {
    return await this.studentService.get(studentId);
  }

  @MessagePattern('updateStudent')
  async update(
    @Payload() input: { data: CreateStudentDto; studentId: string },
  ) {
    return await this.studentService.update(input);
  }

  @MessagePattern('disableStudent')
  async disable(@Payload() studentId: string) {
    return await this.studentService.disable(studentId);
  }
}
