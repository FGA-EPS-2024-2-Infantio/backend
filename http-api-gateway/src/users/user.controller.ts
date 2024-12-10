import { Controller, Get, Inject, Param, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('users')
export class UserController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Get(':userId')
  async getUserProfile(@Param('userId') userId: string, @Req() request: Request) {
    try {
      // Use o método `get` para acessar o cabeçalho `authorization`
      const authorizationHeader = request.headers['authorization'];
      const token = authorizationHeader?.split(' ')[1]; // Extrai o token

      if (!token) {
        throw new Error('Token não encontrado no cabeçalho de autorização.');
      }

      const response = await this.natsClient.send('getUserProfile', {
        userId,
        token,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}
