import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateTicketDto } from './dtos/CreateTicket.dto';

@ApiTags('Tickets')
@Controller('tickets')
export class TicketController {
  constructor(@Inject('NATS_SERVICE') private readonly natsClient: ClientProxy) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo ticket', description: 'Endpoint para criar um novo ticket.' })
  @ApiBody({ type: CreateTicketDto })
  @ApiResponse({ status: 201, description: 'Ticket criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro na validação dos dados.' })
  async createTicket(@Body() createTicketDto: CreateTicketDto) {
    const response = await this.natsClient.send('createTicket', createTicketDto);
    return response;
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os tickets', description: 'Lista todos os tickets disponíveis.' })
  @ApiResponse({ status: 200, description: 'Lista de tickets retornada com sucesso.' })
  async listTickets() {
    return await lastValueFrom(this.natsClient.send('listTickets', {}));
  }


  @Patch(':ticketId')
  @ApiOperation({ summary: 'Atualizar informações do ticket', description: 'Atualiza os dados de um ticket.' })
  @ApiParam({ name: 'ticketId', description: 'ID do ticket.', type: String })
  @ApiBody({ type: CreateTicketDto })
  @ApiResponse({ status: 200, description: 'Ticket atualizado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro na validação dos dados.' })
  @ApiResponse({ status: 404, description: 'Ticket não encontrado.' })
  async updateTicket(@Param('ticketId') ticketId: string, @Body() updateTicketDto: CreateTicketDto) {
    const response = await lastValueFrom(
      this.natsClient.send('updateTicket', { data: updateTicketDto, ticketId }),
    );

    if (response?.statusCode && response?.statusCode !== HttpStatus.OK) {
      throw new HttpException(response.message, response.statusCode);
    }

    return response;
  }
}
