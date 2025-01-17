import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Res } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateMonthlyPaymentDto } from './dtos/CreateMonthlyPayment.dto';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';

@ApiTags('Mensalidades')
@Controller('monthlyPayment')
export class MonthlyPaymentController {
  constructor(@Inject('NATS_SERVICE') private readonly natsClient: ClientProxy) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo pagamento mensal' })
  @ApiResponse({ status: 201, description: 'Pagamento mensal criado com sucesso.' })
  @ApiBody({ type: CreateMonthlyPaymentDto })
  async createMonthlyPayment(@Body() monthlyPaymentDto: CreateMonthlyPaymentDto) {
    return await this.natsClient.send('createMonthlyPayment', monthlyPaymentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os pagamentos mensais' })
  @ApiResponse({ status: 200, description: 'Lista de pagamentos mensais recuperada com sucesso.' })
  async listMonthlyPayment() {
    return await this.natsClient.send('listMonthlyPayment', {});
  }

  @Get(':monthlyPaymentId')
  @ApiOperation({ summary: 'Obter um pagamento mensal específico pelo ID' })
  @ApiParam({ name: 'monthlyPaymentId', description: 'ID do pagamento mensal' })
  @ApiResponse({ status: 200, description: 'Pagamento mensal recuperado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Pagamento mensal não encontrado.' })
  async getMonthlyPayment(@Param('monthlyPaymentId') monthlyPaymentId: string) {
    return await this.natsClient.send('getMonthlyPayment', monthlyPaymentId);
  }

  @Patch(':monthlyPaymentId')
  @ApiOperation({ summary: 'Atualizar um pagamento mensal específico pelo ID' })
  @ApiParam({ name: 'monthlyPaymentId', description: 'ID do pagamento mensal a ser atualizado' })
  @ApiBody({ type: CreateMonthlyPaymentDto })
  @ApiResponse({ status: 200, description: 'Pagamento mensal atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Pagamento mensal não encontrado.' })
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
  @ApiOperation({ summary: 'Desativar um pagamento mensal específico pelo ID' })
  @ApiParam({ name: 'monthlyPaymentId', description: 'ID do pagamento mensal a ser desativado' })
  @ApiResponse({ status: 200, description: 'Pagamento mensal desativado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Pagamento mensal não encontrado.' })
  async disableMonthlyPayment(@Param('monthlyPaymentId') monthlyPaymentId: string) {
    return await this.natsClient.send('disableMonthlyPayment', monthlyPaymentId);
  }

  @Get('download/:studentId')
  @ApiOperation({ summary: 'Download de mensalidades de um estudante em formato CSV' })
  @ApiParam({ name: 'studentId', description: 'ID do estudante' })
  @ApiResponse({ status: 200, description: 'Arquivo CSV gerado com sucesso.' })
  async downloadMonthlyPaymentsByStudent(
    @Param('studentId') studentId: string,
    @Res() res: Response
  ) {
    const csvData = await firstValueFrom(
      this.natsClient.send<string>('downloadMonthlyPaymentsByStudent', studentId)
    );
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=historico_de_mensalidades.csv`);
    res.send(csvData);
  }
}
