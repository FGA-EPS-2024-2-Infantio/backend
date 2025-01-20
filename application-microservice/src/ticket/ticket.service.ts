import { Injectable } from '@nestjs/common';
import { CreateTicketDTO } from './dtos/CreateTicket.dto';
import { TicketResponseDto } from './dtos/TicketResponse.dto';
import { TicketPrismaService } from './ticket.prisma';

@Injectable()
export class TicketService {
  constructor(private readonly ticketPrismaService: TicketPrismaService) {}

  async create(data: CreateTicketDTO) {
    try {
      const ticket = await this.ticketPrismaService.createTicket(data);
  
      return {
        message: 'Ticket created successfully',
        data: ticket,
      };
    } catch (error) {
      throw new Error('Failed to create ticket: ' + error.message);
    }
  }

  async findAll(): Promise<TicketResponseDto[]> {
    return await this.ticketPrismaService.findAllTickets();
  }


  async update(input: { data: CreateTicketDTO; ticketId: string }) {
    try {
      const ticket = await this.ticketPrismaService.updateTicket(input);
      return {
        message: 'Ticket updated successfully',
        data: ticket,
      };
    } catch (error) {
      throw new Error('Failed to update ticket: ' + error.message);
    }
  }

}
