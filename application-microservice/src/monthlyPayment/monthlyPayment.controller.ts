import { Controller, NotFoundException } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateMonthlyPaymentDto } from './dtos/CreateMonthlyPayment.dto';
import { MonthlyPaymentResponseDto } from './dtos/MonthlyPayment.dto';
import { MonthlyPaymentService } from './monthlyPayment.service';

@Controller()
export class MonthlyPaymentMicroserviceController {
  constructor(private readonly monthlyPaymentService: MonthlyPaymentService) {}

  @MessagePattern('createMonthlyPayment')
  async create(@Payload() createStudentDto: CreateMonthlyPaymentDto) {
    const payment = await this.monthlyPaymentService.create(createStudentDto);

    return {
      message: 'Payment created successfully',
      data: payment,
    };
  }

  @MessagePattern('listMonthlyPayment')
  async getAll(): Promise<MonthlyPaymentResponseDto[]> {
    return await this.monthlyPaymentService.findAll();
  }

  @MessagePattern('getMonthlyPayment')
  async get(studentId: string): Promise<MonthlyPaymentResponseDto> {
    const payment = await this.monthlyPaymentService.get(studentId);

    if (payment === null) throw new NotFoundException('Payment not found');

    return payment;
  }

  @MessagePattern('updateMonthlyPayment')
  async update(
    @Payload()
    input: {
      data: CreateMonthlyPaymentDto;
      monthlyPaymentId: string;
    },
  ) {
    const payment = await this.monthlyPaymentService.update(input);

    return {
      message: 'Payment updated successfully',
      data: payment,
    };
  }

  @MessagePattern('disableMonthlyPayment')
  async disable(@Payload() studentId: string) {
    const payment = await this.monthlyPaymentService.disable(studentId);

    return {
      message: 'Payment deleted successfully',
      data: payment,
    };
  }
}
