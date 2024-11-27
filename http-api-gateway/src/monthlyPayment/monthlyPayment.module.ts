import { Module } from '@nestjs/common';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { MonthlyPaymentController } from './student.controller';

@Module({
  imports: [NatsClientModule],
  controllers: [MonthlyPaymentController],
  providers: [],
})
export class MonthlyPaymentModule {}
