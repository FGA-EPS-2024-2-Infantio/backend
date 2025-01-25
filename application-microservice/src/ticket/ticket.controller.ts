import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTicketDTO } from './dtos/CreateTicket.dto';
import { TicketResponseDto } from './dtos/TicketResponse.dto';
import { TicketService } from './ticket.service';

@Controller()
export class TicketMicroserviceController {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClients: ClientProxy,
    private readonly ticketService: TicketService,
  ) {}

  @MessagePattern('createTicket')
  async create(@Payload() createTicketDto: CreateTicketDTO) {
    return await this.ticketService.create(createTicketDto);
  }

  @MessagePattern('listTickets')
  async getAll(): Promise<TicketResponseDto[]> {
    return await this.ticketService.findAll();
  }

  @MessagePattern('updateTicket')
  async update(
    @Payload() input: { data: CreateTicketDTO; ticketId: string },
  ){
    return await this.ticketService.update(input);
  }

}
