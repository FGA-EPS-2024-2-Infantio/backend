import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateSchoolDto } from './dtos/CreateSchool.dto';
import { SchoolResponseDto } from './dtos/SchoolResponse.dto';
import { SchoolsService } from './school.service';

@Controller()
export class SchoolMicroserviceController {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClients: ClientProxy,
    private readonly schoolService: SchoolsService,
  ) { }

  @MessagePattern('createSchool')
  async createSchool(@Payload() createSchoolDto: CreateSchoolDto) {
    return await this.schoolService.create(createSchoolDto);
  }

  @MessagePattern('listSchool')
  async getAllSchools(): Promise<SchoolResponseDto[]> {
    return await this.schoolService.findAll();
  }

  @MessagePattern('getSchool')
  async get(@Payload() schoolId: string): Promise<SchoolResponseDto> {
    return await this.schoolService.get(schoolId);
  }

  @MessagePattern('disableSchool')
  async disable(@Payload() schoolId: string) {
    return await this.schoolService.disable(schoolId);
  }

  @MessagePattern('updateSchool')
  async update(
    @Payload() input: { data: CreateSchoolDto; schoolId: string },
  ): Promise<SchoolResponseDto> {
    return await this.schoolService.update(input);
  }

  @MessagePattern('getSchoolClasses')
  async getSchoolClasses(@Payload() schoolId: string) {
    try {
      return await this.schoolService.findClassesBySchool(schoolId);
    } catch (error) {
      throw new Error(
        `Failed to fetch classes for teacher ${schoolId}: ${error.message}`,
      );
    }
  }

  @MessagePattern('getSchoolStudents')
  async getSchoolStudents(@Payload() schoolId: string) {
    return await this.schoolService.findStudentsBySchool(schoolId);
  }

  @MessagePattern('getSchoolTeachers')
  async getSchoolTeachers(@Payload() schoolId: string) {
    return await this.schoolService.findTeachersBySchool(schoolId);
  }
}
