import { Module } from '@nestjs/common';
import { PrismaModule } from '../database/prisma.module';
import { NatsClientModule } from '../nats-client/nats-client.module';
import { MonthlyPaymentMicroserviceController } from './monthlyPayment.controller';
import { MonthlyPaymentPrismaService } from './monthlyPayment.prisma';
import { MonthlyPaymentService } from './monthlyPayment.service';

@Module({
  imports: [NatsClientModule, PrismaModule],
  controllers: [MonthlyPaymentMicroserviceController],
  providers: [MonthlyPaymentPrismaService, MonthlyPaymentService],
  exports: [MonthlyPaymentPrismaService, MonthlyPaymentService],
})
export class MonthlyPaymentModule {}
