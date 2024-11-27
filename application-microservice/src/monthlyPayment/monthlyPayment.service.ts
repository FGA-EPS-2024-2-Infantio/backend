import { Injectable } from '@nestjs/common';
import { CreateMonthlyPaymentDto } from './dtos/CreateMonthlyPayment.dto';
import { MonthlyPaymentResponseDto } from './dtos/MonthlyPayment.dto';
import { MonthlyPaymentPrismaService } from './monthlyPayment.prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Prisma } from '@prisma/client';

@Injectable()
export class MonthlyPaymentService {
  constructor(private readonly monthlyPaymentPrismaService: MonthlyPaymentPrismaService) {}

  async create(data: CreateMonthlyPaymentDto) {
    const monthlyPayment = await this.monthlyPaymentPrismaService.create(data);

    return {
      message: 'Monthly payment created successfully',
      data: monthlyPayment,
    };
  }

  async findAll(): Promise<MonthlyPaymentResponseDto[]> {
    return await this.monthlyPaymentPrismaService.findAll();
  }

  async get(monthlyPaymentId: string): Promise<MonthlyPaymentResponseDto> {
    const monthlyPayment = await this.monthlyPaymentPrismaService.get(monthlyPaymentId);

    if (monthlyPayment === null)
      throw new PrismaClientKnownRequestError('Monthly payment not found', {
        code: 'P2025',
        clientVersion: Prisma.prismaVersion.client,
      });

    return monthlyPayment;
  }

  async update(input: {
    data: CreateMonthlyPaymentDto;
    monthlyPaymentId: string;
  }) {
    const monthlyPayment = await this.monthlyPaymentPrismaService.update(input);

    return {
      message: 'Monthly payment updated successfully',
      data: monthlyPayment,
    };
  }

  async disable(monthlyPaymentId: string) {
    const monthlyPayment = await this.monthlyPaymentPrismaService.disable(monthlyPaymentId);

    return {
      message: 'Monthly payment deleted successfully',
      data: monthlyPayment,
    };
  }
}
