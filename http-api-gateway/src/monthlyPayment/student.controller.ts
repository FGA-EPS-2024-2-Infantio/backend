import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateMonthlyPaymentDto } from './dtos/CreateMonthlyPayment.dto';

@Controller('monthlyPayment')
export class MonthlyPaymentController {
  constructor(@Inject('NATS_SERVICE') private readonly natsClient: ClientProxy) {}

  @Post()
  async createMonthlyPayment(@Body() monthlyPaymentDto: CreateMonthlyPaymentDto) {
    return await this.natsClient.send('createMonthlyPayment', monthlyPaymentDto);
  }

  @Get()
  async listMonthlyPayment() {
    return await this.natsClient.send('listMonthlyPayment', {});
  }

  @Get(':monthlyPaymentId')
  async getMonthlyPayment(@Param('monthlyPaymentId') monthlyPaymentId: string) {
    return await this.natsClient.send('getMonthlyPayment', monthlyPaymentId);
  }

  @Patch(':monthlyPaymentId')
  async updateMonthlyPayment(
    @Param('monthlyPaymentId') monthlyPaymentId: string,
    @Body() updateMonthlyPaymentDto: CreateMonthlyPaymentDto,
  ) {
    return await this.natsClient.send('updateMonthlyPayment', {
      data: updateMonthlyPaymentDto,
      monthlyPaymentId: monthlyPaymentId,
    });
  }

  @Delete(':monthlyPaymentId')
  async disableMonthlyPayment(@Param('monthlyPaymentId') monthlyPaymentId: string) {
    return await this.natsClient.send('disableMonthlyPayment', monthlyPaymentId);
  }
}
