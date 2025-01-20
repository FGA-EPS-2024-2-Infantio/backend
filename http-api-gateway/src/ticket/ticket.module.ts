import { Module } from '@nestjs/common';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { TicketController } from './ticket.controller';

@Module({
  imports: [NatsClientModule],
  controllers: [TicketController],
  providers: [],
})
export class TicketModule {}