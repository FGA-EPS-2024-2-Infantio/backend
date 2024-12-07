import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateSchoolDto } from './dtos/CreateStudent.dto';
import { SchoolsService } from './school.service';
import { SchoolResponseDto } from './dtos/SchoolResponse.dto';

@Controller()
export class SchoolMicroserviceController {
  constructor(
    @Inject('NATS_SERVICE') private natsClients: ClientProxy,
    private readonly schoolService: SchoolsService,
  ) {}

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
}
