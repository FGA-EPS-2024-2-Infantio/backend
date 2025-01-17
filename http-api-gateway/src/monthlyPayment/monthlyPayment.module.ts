import { Module } from '@nestjs/common';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { MonthlyPaymentController } from './monthlyPayment.controller';

@Module({
  imports: [NatsClientModule],
  controllers: [MonthlyPaymentController],
  providers: [],
})
export class MonthlyPaymentModule {}
