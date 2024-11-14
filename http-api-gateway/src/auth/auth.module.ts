import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.stategy';
import { UsersController } from '../users/users.controller'
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), NatsClientModule],
  providers: [JwtStrategy],
  exports: [PassportModule],
  controllers: [UsersController],
})
export class AuthModule {}
