import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { ClassesService } from './class.service';
import { ClassResponseDto } from './dtos/ClassResponse.dto';
import { CreateClassDto } from './dtos/CreateClass.dto';

@Controller()
export class ClassMicroserviceController {
  constructor(
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
    private readonly classService: ClassesService,
  ) {}

  @MessagePattern('createClass')
  async createClass(@Payload() createClassDto: CreateClassDto) {
    return await this.classService.create(createClassDto);
  }

  @MessagePattern('listClasses')
  async getAllClasses(): Promise<ClassResponseDto[]> {
    return await this.classService.findAll();
  }

  @MessagePattern('getClass')
  async get(@Payload() classId: string): Promise<ClassResponseDto> {
    return await this.classService.get(classId);
  }

  @MessagePattern('disableClass')
  async disable(@Payload() classId: string) {
    return await this.classService.disable(classId);
  }

  @MessagePattern('updateClass')
  async update(
    @Payload() input: { data: CreateClassDto; classId: string },
  ): Promise<ClassResponseDto> {
    return await this.classService.update(input);
  }

  @MessagePattern('updateClassStudents')
  async updateStudents(
    @Payload()
    { classId, studentIds }: { classId: string; studentIds: string[] },
  ): Promise<ClassResponseDto> {
    return await this.classService.updateStudents(classId, studentIds);
  }
}
