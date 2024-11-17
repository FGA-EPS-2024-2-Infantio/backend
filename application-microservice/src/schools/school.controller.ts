import { Controller, Inject } from '@nestjs/common';
import {
  ClientProxy,
  EventPattern,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { CreateSchoolDto } from './dtos/CreateStudent.dto';
import { SchoolResponseDto } from './dtos/SchoolResponse.dto';
import { SchoolsService } from './school.service';

@Controller()
export class SchoolMicroserviceController {
  constructor(
    @Inject('NATS_SERVICE') private natsClients: ClientProxy,
    private readonly schoolService: SchoolsService,
  ) {}

  @EventPattern('createSchool')
  async createSchool(@Payload() createSchoolDto: CreateSchoolDto) {
    await this.schoolService.create(createSchoolDto);
  }

  @MessagePattern('listSchool')
  async getAllSchools(): Promise<SchoolResponseDto[]> {
    return await this.schoolService.findAll();
  }

  @MessagePattern('getSchool')
  async get(@Payload() schoolId: string): Promise<SchoolResponseDto> {
    return await this.schoolService.get(schoolId);
  }

  @EventPattern('disableSchool')
  async disable(@Payload() schoolId: string) {
    await this.schoolService.disable(schoolId);
  }

  @MessagePattern('updateSchool')
  async update(
    @Payload() input: { data: CreateSchoolDto; schoolId: string },
  ): Promise<SchoolResponseDto> {
    return await this.schoolService.update(input);
  }
}
