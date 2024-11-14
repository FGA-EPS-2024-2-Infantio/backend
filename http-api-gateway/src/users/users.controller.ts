import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('users')

export class UsersController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('test')
  getTestAuth(){
  return { message: 'Você está autenticado!' };
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log('NATS SENDING', createUserDto);
    return this.natsClient.send({ cmd: 'createUser' }, createUserDto);
  }
}
