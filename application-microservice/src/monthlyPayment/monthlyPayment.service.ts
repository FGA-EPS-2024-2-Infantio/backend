import { Injectable } from '@nestjs/common';
import { CreateMonthlyPaymentDto } from './dtos/CreateMonthlyPayment.dto';
import { MonthlyPaymentResponseDto } from './dtos/MonthlyPayment.dto';
import { MonthlyPaymentPrismaService } from './monthlyPayment.prisma';

@Injectable()
export class MonthlyPaymentService {
  constructor(
    private readonly monthlyPaymentPrismaService: MonthlyPaymentPrismaService,
  ) {}

  async create(data: CreateMonthlyPaymentDto) {
    return await this.monthlyPaymentPrismaService.create(data);
  }

  async findAll(): Promise<MonthlyPaymentResponseDto[]> {
    return await this.monthlyPaymentPrismaService.findAll();
  }

  async get(monthlyPaymentId: string): Promise<MonthlyPaymentResponseDto> {
    return await this.monthlyPaymentPrismaService.get(monthlyPaymentId);
  }

  async update(input: {
    data: CreateMonthlyPaymentDto;
    monthlyPaymentId: string;
  }) {
    return await this.monthlyPaymentPrismaService.update(input);
  }

  async disable(monthlyPaymentId: string) {
    return await this.monthlyPaymentPrismaService.disable(monthlyPaymentId);
  }

  async findByStudentId(studentId: string): Promise<MonthlyPaymentResponseDto[]> {
    return await this.monthlyPaymentPrismaService.findByStudentId(studentId);
  }
}
