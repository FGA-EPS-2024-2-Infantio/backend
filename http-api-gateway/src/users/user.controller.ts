import { Controller, Get, Inject, Param, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(@Inject('NATS_SERVICE') private readonly natsClient: ClientProxy) {}

  @Get(':userId')
  @ApiOperation({ summary: 'Obter o perfil de um usuário.' })
  @ApiResponse({ status: 200, description: 'Perfil do usuário retornado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro ao obter o perfil do usuário.' })
  @ApiResponse({ status: 401, description: 'Token de autorização inválido.' })
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
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }
}
