import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
    constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Get('check-user')
  async checkUser(@Query('email') email: string) {
    const result = await this.natsClient.send('checkUser', { email }).toPromise();
    return result;
  }
}