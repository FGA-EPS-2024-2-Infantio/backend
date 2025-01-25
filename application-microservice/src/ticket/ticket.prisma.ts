import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateTicketDTO } from './dtos/CreateTicket.dto';
import { TicketResponseDto } from './dtos/TicketResponse.dto';

@Injectable()
export class TicketPrismaService {
  constructor(private readonly prisma: PrismaService) {}

  async createTicket(data: CreateTicketDTO): Promise<TicketResponseDto> {
    try {
      const ticket = await this.prisma.ticket.create({
        data: data,
      });
      return this.mapToTicketResponseDto(ticket);
    } catch (error) {
      throw new Error('Failed to create ticket: ' + error.message);
    }
  }

  async findAllTickets(): Promise<TicketResponseDto[]> {
    const tickets = await this.prisma.ticket.findMany();
    return tickets.map((ticket) => this.mapToTicketResponseDto(ticket));
  }

  async updateTicket(input: { ticketId: string; data: CreateTicketDTO }): Promise<TicketResponseDto> {
    try {
      const updatedTicket = await this.prisma.ticket.update({
        where: {
          id: input.ticketId,
        },
        data: input.data,
      });
      return this.mapToTicketResponseDto(updatedTicket);
    } catch (error) {
      throw new Error('Failed to update ticket: ' + error.message);
    }
  }

  private mapToTicketResponseDto(ticket: any): TicketResponseDto {
    return {
      id: ticket.id,
      title: ticket.title,
      message: ticket.message,
      response: ticket.response,
      status: ticket.status,
      directorId: ticket.directorId,
      directorName: ticket.directorName,
      adminId: ticket.adminId,
      createdAt: ticket.createdAt,
      updatedAt: ticket.updatedAt,
    };
  }
}
