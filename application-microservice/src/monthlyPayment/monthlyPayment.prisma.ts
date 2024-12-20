import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateMonthlyPaymentDto } from './dtos/CreateMonthlyPayment.dto';
import { MonthlyPaymentResponseDto } from './dtos/MonthlyPayment.dto';

@Injectable()
export class MonthlyPaymentPrismaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateMonthlyPaymentDto) {
    return await this.prisma.monthlyPayment.create({ data });
  }

  async findAll(): Promise<MonthlyPaymentResponseDto[]> {
    return await this.prisma.monthlyPayment.findMany();
  }

  async get(monthlyPaymentId: string): Promise<MonthlyPaymentResponseDto> {
    return await this.prisma.monthlyPayment.findUnique({
      where: {
        id: monthlyPaymentId,
      },
    });
  }

  async update(input: {
    data: CreateMonthlyPaymentDto;
    monthlyPaymentId: string;
  }): Promise<MonthlyPaymentResponseDto> {
    return await this.prisma.monthlyPayment.update({
      where: {
        id: input.monthlyPaymentId,
      },
      data: input.data,
    });
  }

  async disable(monthlyPaymentId: string): Promise<MonthlyPaymentResponseDto> {
    return await this.prisma.monthlyPayment.update({
      where: {
        id: monthlyPaymentId,
      },
      data: {
        disabled: true,
        disabledAt: new Date(),
      },
    });
  }
}
