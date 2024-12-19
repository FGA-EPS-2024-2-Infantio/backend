import { Body, Controller, Inject, Post, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { LoginDTO } from './dtos/auth.login';

@Controller('auth')
export class AuthController {
  constructor(@Inject('NATS_SERVICE') private readonly natsClient: ClientProxy) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.natsClient.send('registerUser', createUserDto);
  }

  @Post('/login')
  login(@Body() dto: LoginDTO) {
    return this.natsClient.send('login', dto);
  }

  @Post('/refresh')
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
