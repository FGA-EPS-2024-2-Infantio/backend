import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateMonthlyPaymentDto } from './dtos/CreateMonthlyPayment.dto';
import { MonthlyPaymentResponseDto } from './dtos/MonthlyPayment.dto';
import { MonthlyPaymentService } from './monthlyPayment.service';

@Controller()
export class MonthlyPaymentMicroserviceController {
  constructor(
    @Inject('NATS_SERVICE') private natsClients: ClientProxy,
    private readonly monthlyPaymentService: MonthlyPaymentService,
  ) {}

  @MessagePattern('createMonthlyPayment')
  async create(@Payload() createStudentDto: CreateMonthlyPaymentDto) {
    return await this.monthlyPaymentService.create(createStudentDto);
  }

  @MessagePattern('listMonthlyPayment')
  async getAll(): Promise<MonthlyPaymentResponseDto[]> {
    return await this.monthlyPaymentService.findAll();
  }

  @MessagePattern('getMonthlyPayment')
  async get(studentId: string): Promise<MonthlyPaymentResponseDto> {
    return await this.monthlyPaymentService.get(studentId);
  }

  @MessagePattern('updateMonthlyPayment')
  async update(
    @Payload() input: { data: CreateMonthlyPaymentDto; monthlyPaymentId: string },
  ) {
    return await this.monthlyPaymentService.update(input);
  }

  @MessagePattern('disableMonthlyPayment')
  async disable(@Payload() studentId: string) {
    return await this.monthlyPaymentService.disable(studentId);
  }
}
