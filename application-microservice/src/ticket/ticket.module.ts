import { Module } from '@nestjs/common';
import { PrismaModule } from '../database/prisma.module'; 
import { NatsClientModule } from '../nats-client/nats-client.module'; 
import { TicketMicroserviceController } from './ticket.controller'; 
import { TicketPrismaService } from './ticket.prisma'; 
import { TicketService } from './ticket.service'; 

@Module({
  imports: [NatsClientModule, PrismaModule], 
  controllers: [TicketMicroserviceController], 
  providers: [TicketPrismaService, TicketService],
})
export class TicketModule {}
