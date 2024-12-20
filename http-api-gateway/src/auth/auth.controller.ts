import { Body, Controller, Inject, Post, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { LoginDTO } from './dtos/auth.login';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(@Inject('NATS_SERVICE') private readonly natsClient: ClientProxy) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário.' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Falha ao criar o usuário.' })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.natsClient.send('registerUser', createUserDto);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Realizar login.' })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Falha no login.' })
  login(@Body() dto: LoginDTO) {
    return this.natsClient.send('login', dto);
  }

  @Post('/refresh')
  @ApiOperation({ summary: 'Atualizar o token de acesso com o refresh token.' })
  @ApiResponse({ status: 200, description: 'Token atualizado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Falha ao atualizar o token.' })
  async refresh(@Req() request: Request) {
    try {
      const authorizationHeader = request.headers['authorization'];
      const token = authorizationHeader?.split(' ')[1];

      if (!token) {
        throw new Error('Refresh token não encontrado no cabeçalho de autorização.');
      }

      const response = await this.natsClient.send('refreshToken', {
        token,
      });
      return response;
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }
}
